import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import { clearErrors } from '../../actions/errorActions';
import { setCard, saveCard, clearCard, initPage, addPage, delPage, nextPage, prevPage } from '../../actions/cardActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import Loader from '../common/Loader';
import axios from 'axios';

class Pallete extends React.Component {
  constructor() {
    super();
    this.state = {
      handle: '',
      type1: '', type2: '',
      text: [],
      img: [],
      movie: [],
      img0loading: false, img1loading: false, img2loading: false, img3loading: false, img4loading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onDelClick = this.onDelClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
  }
  
  componentWillMount() {
    const { card }= this.props.card;

    if(isEmpty(card) || isEmpty(card.pageidx)) {
      this.props.initPage();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.card && nextProps.card.card && !isEmpty(nextProps.card.card.pageidx)) {
      this.setState(
        {
          ...nextProps.card.card.page[nextProps.card.card.pageidx]
        }
      )
    }

    if (nextProps.card && nextProps.card.card && !isEmpty(nextProps.card.card.pageidx) && !isEmpty(nextProps.card.card.page) && !isEmpty(nextProps.card.card.page[nextProps.card.card.pageidx])){
      this.setState({
        text: nextProps.card.card.page[nextProps.card.card.pageidx].text,
        img: nextProps.card.card.page[nextProps.card.card.pageidx].img,
        movie: nextProps.card.card.page[nextProps.card.card.pageidx].movie
      });
    }
    
    if(nextProps.errors.handle) {
      window.alert(nextProps.errors.handle);
      this.props.clearErrors();
    }
  }
  
  onChange(e) {
    const target = e.target;
    
    if(target.name.indexOf('type1') !== -1) {
      this.setState({
        type1: target.value,
        type2: '',
        text: [],
        img: [],
        movie: []
      }, this.changeCardData);
    } else if(target.name.indexOf('type2') !== -1) {
      this.setState({
        type2: target.value,
        text: [],
        img: [],
        movie: []
      }, this.changeCardData);
    } else if(target.name.indexOf('img') !== -1) {
      const form = new FormData();
      
      const loadingState = target.name + 'loading';

      form.append("image", target.files[0]);
      form.append("name", target.files[0] ? target.files[0].name : '');

      const settings = {
        "headers": {
          "Authorization": "Bearer 5b0cef8e4138fa350ea740e2ba291b6ce7a1cd29"
        }
      }

      this.setState({[loadingState]: true});
      axios
        .post("https://api.imgur.com/3/image", form, settings)
        .then(res => {
          let img = this.state.img;
          img.splice(
            Number(target.name.substring(target.name.indexOf('img')+3)), 1,
            {
              url: res.data.data.link,
              name: res.data.data.name,
              hash: res.data.data.deletehash
            }
          );
          this.setState({ img });
          this.setState({[loadingState]: false}, this.changeCardData);
        });
    } else if (target.name.indexOf('text') !== -1) {
      let text = this.state.text;
      text.splice(Number(target.name.substring(target.name.indexOf('text')+4)), 1, target.value);
      this.setState({ text }, this.changeCardData);
    } else if (target.name.indexOf('movie') !== -1) {
      let movie = this.state.movie;
      movie.splice(Number(target.name.substring(target.name.indexOf('movie')+5)), 1, target.value);
      this.setState({ movie }, this.changeCardData);
    }
  }

  changeCardData() {
    let { card } = this.props.card;

    const pageData = {
      type1: this.state.type1,
      type2: this.state.type2,
      text: this.state.text,
      img: this.state.img,
      movie: this.state.movie
    };

    card.page.splice(card.pageidx, 1, pageData);

    this.props.setCard(card);
  }

  onAddClick() {
    const { card } = this.props.card;

    this.props.addPage(card.pageidx);
  }

  onDelClick() {
    const { card } = this.props.card;

    this.props.delPage(card.pageidx);
  }

  onNextClick() {
    const { card } = this.props.card;

    if(card.pageidx + 1 === card.page.length) {
      alert('Please add new page');
    } else {
      this.props.nextPage(card.pageidx);
    }
  }

  onPrevClick() {
    const { card } = this.props.card;

    if(card.pageidx === 0) {
      alert('It\'s the first page');
    } else {
      this.props.prevPage(card.pageidx);
    }
  }

  onBackClick() {
    if( window.confirm('Are you sure go dashboard? card will be gone!') ) {
      this.props.clearCard();
      this.props.history.push('/dashboard');
    }
  }

  onLinkClick() {
    const address =  window.prompt('Insert any text, it\'ll be card address',isEmpty(this.state.handle) ? 'Card address' : this.state.handle);
    this.setState({
      handle: isEmpty(address) ? '' : address
    });
  }

  onSaveClick() {
    if( window.confirm('Save this card?') ) {
      let { card } = this.props.card;
      card.handle = this.state.handle;

      delete card.pageidx;

      this.props.saveCard(card, this.props.history);
    }   
  }

  render () {
    const { errors } = this.props;
    const { card }= this.props.card;

    // display page
    const pageDisplay = (<span>Page: {(isEmpty(card) || isEmpty(card.pageidx)) ? '1/1' : card.pageidx+1+'/'+card.page.length}</span>)

    const type1Options = [
      { label: 'Main Type', value: '' },
      { label: 'Main', value: 'Main' },
      { label: 'Text', value: 'Text' },
      { label: 'Image', value: 'Img' },      
      { label: 'Movie', value: 'Movie' },
      { label: 'Comment', value: 'Comment' },
      { label: 'Map', value: 'Map' }
    ];

    const type2Options = [
      { upperSel: '', label: 'Sub Type', value: '' },
      { upperSel: 'Main', label: 'Sub Type', value: '' },
      { upperSel: 'Main', label: '1', value: '1' },
      { upperSel: 'Text', label: 'Sub Type', value: '' },
      { upperSel: 'Text', label: '1', value: '1' },
      { upperSel: 'Img', label: 'Sub Type', value: '' },
      { upperSel: 'Img', label: '1', value: '1' },
      { upperSel: 'Movie', label: 'Sub Type', value: '' },
      { upperSel: 'Movie', label: '1', value: '1' },
      { upperSel: 'Comment', label: 'Sub Type', value: '' },
      { upperSel: 'Map', label: 'Sub Type', value: '' }
    ];

    // numoftext: 3,
    // numofimg: 2,
    // numofmovie: 1
    let textGroup = [];
    let imgGroup = [];
    let movieGroup = [];
    // 여기에서 에러 생김!! numof#### 각 템플릿마다 정확하게 가져오도록 수정하면 해결될 듯!
    if(!isEmpty(card) && !isEmpty(card.page) && !isEmpty(card.pageidx) && !isEmpty(card.page[card.pageidx])) {
      if(!isEmpty(card.page[card.pageidx].text) && card.page[card.pageidx].text.length > 0) {        
        for( let i=0 ; i < card.page[card.pageidx].text.length ; i++ ) {
          textGroup.push(
            (
              <TextFieldGroup
                key={ i }
                name={ 'text' + i }
                placeholder={ 'Insert Text'+(i+1) }
                value={ this.state.text[i] }
                error={ errors['text'+i] }
                onChange={ this.onChange }
              />
            )
          );
        }
      }

      if(!isEmpty(card.page[card.pageidx].img) && card.page[card.pageidx].img.length > 0) {
        for( let i=0 ; i < card.page[card.pageidx].img.length ; i++ ) {
          imgGroup.push(
            (
              <div key={ i } className="form-group">
                <label className="btn" style={{backgroundColor: '#59d6db', color: '#ffffff'}} htmlFor={'img'+i}>Upload Image{i+1}</label>
                <input
                  type="file"
                  id={'img'+i}
                  className='form-control form-control-file form-control-lg'
                  style={
                    {
                      visibility: 'hidden',
                      fontSize: '1em',
                      width: '0%',
                      display: 'inline',
                      padding: '0px 0px 0px 0px',
                      margin: '0px 0px 0px 0px',
                      borderWidth: '0px 0px 0px 0px'
                    }
                  }
                  accept='image/*'
                  name={'img'+i}
                  onChange={ this.onChange }
                />
                <span
                  className="form-text ml-2"
                  style={{display: 'inline-block'}}
                >
                  { this.state['img'+i+'loading'] ? <Loader /> : (this.state.img[i] && this.state.img[i].name ? this.state.img[i].name : 'You have not yet upload')}
                </span>
              </div>
            )
          );
        }
      }

      if(!isEmpty(card.page[card.pageidx].movie) && card.page[card.pageidx].movie.length > 0) {
        for( let i=0 ; i < card.page[card.pageidx].movie.length ; i++ ) {
          movieGroup.push(
            (
              <TextFieldGroup
                key={ i }
                name={'movie'+i}
                placeholder={ 'Embed Movie'+(i+1) }
                value={ this.state.movie[i] }
                error={ errors['movie'+i] }
                onChange={ this.onChange }
              />
            )
          );
        }
      }
    }

    return (
      <div className="mr-auto mt-2" id="pallete">
        <div className="container">
          <div className="row">
            <div className="col">
              { pageDisplay }
              <a className="btn btn-lg float-right" onClick={this.onBackClick}><i className="fas fa-home" style={{fontSize: '35px', color: '#ff877a'}}></i></a>
              <div className="d-inline float-right border-bottom" style={{minWidth: '180px'}}>
                <a className="float-right btn btn-lg" onClick={this.onLinkClick}><i className="fas fa-link" style={{fontSize: '35px', color: '#ff877a'}}></i></a>
                <span className="float-right text-center text-muted pt-3">{isEmpty(this.state.handle) ? 'Card address' : this.state.handle}</span>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <hr style={{borderWidth: '2px', width: '88%', marginTop: '0px', marginBottom: '0px', margin: 'auto'}}/>
          </div>
          <div className="row mt-2" id="main-tool">
            <div className="col-2 text-center" style={{padding: '0'}}>
              <a className="btn btn-lg" style={{paddingLeft: '10px', paddingRight: '10px'}} onClick={this.onAddClick}><i className="fas fa-plus-square" style={{fontSize: '50px', color: '#59d6db'}}></i></a>
            </div>
            <div className="col-2 text-center" style={{padding: '0'}}>
              <a className="btn btn-lg" style={{paddingLeft: '10px', paddingRight: '10px'}} onClick={this.onDelClick}><i className="fas fa-minus-square" style={{fontSize: '50px', color: '#59d6db'}}></i></a>
            </div>
            <div className="col-2 text-center" style={{padding: '0'}}>
              <a className="btn btn-lg" style={{paddingLeft: '10px', paddingRight: '10px'}} onClick={this.onPrevClick}><i className="fas fa-caret-square-left" style={{fontSize: '50px', color: '#59d6db'}}></i></a>
            </div>
            <div className="col-2 text-center" style={{padding: '0'}}>
              <a className="btn btn-lg" style={{paddingLeft: '10px', paddingRight: '10px'}} onClick={this.onNextClick}><i className="fas fa-caret-square-right" style={{fontSize: '50px', color: '#59d6db'}}></i></a>
            </div>
            <div className="col-2 text-center" style={{padding: '0'}}>
              <a className="btn btn-lg" style={{paddingLeft: '10px', paddingRight: '10px'}} onClick={()=>{alert('It\'s on developing (Navigation bar, scroll type, back music, etc...)')}}><i className="fas fa-bars" style={{fontSize: '50px', color: '#59d6db'}}></i></a>
            </div>
            <div className="col-2 text-center" style={{padding: '0'}}>
              <a className="btn btn-lg" style={{paddingLeft: '10px', paddingRight: '10px'}} onClick={this.onSaveClick}><i className="fas fa-save" style={{fontSize: '50px', color: '#59d6db'}}></i></a>
            </div>
          </div>
          <div className="row mt-2">
            <hr style={{borderWidth: '2px', width: '88%', marginTop: '0px', marginBottom: '0px', margin: 'auto'}}/>
          </div>
          <div className="row mt-2" id="content-tool">
            <div className="col">
              <div className="row">
                <div className="col">
                  <SelectListGroup
                    name="type1"
                    value={ this.state.type1 }
                    error={ errors.type1 }
                    info="Main type of this page"
                    onChange={ this.onChange }
                    options={ type1Options }
                  /> 
                </div>
                <div className="col">
                  <SelectListGroup
                    name="type2"
                    value={ this.state.type2 }
                    error={ errors.type2 }
                    info="Sub type of this page"
                    onChange={ this.onChange }
                    options={ type2Options }
                    upperSel={ this.state.type1 }
                  />
                </div>
              </div>
              { isEmpty(textGroup) ? null : (
                  <div className="row mt-2">
                    <div className="col">
                      { textGroup }
                    </div>
                  </div>
              )}

              { isEmpty(imgGroup) ? null : (
                <div className="row mt-2">
                  <div className="col">
                    { imgGroup }
                  </div>
                </div>
              )}
              
              { isEmpty(movieGroup) ? null : (
                <div className="row mt-2">
                  <div className="col">
                    { movieGroup }
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Pallete.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  setCard: PropTypes.func.isRequired,
  saveCard: PropTypes.func.isRequired,
  clearCard: PropTypes.func.isRequired,
  initPage: PropTypes.func.isRequired,
  addPage: PropTypes.func.isRequired,
  delPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  card: state.card,
  errors: state.errors
});

export default connect(mapStateToProps, { clearErrors, setCard, saveCard, clearCard, initPage, addPage, delPage, nextPage, prevPage })(withRouter(Pallete));
