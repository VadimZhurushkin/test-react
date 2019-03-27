import React, {Component} from 'react';
import './TextBox.css';

const FINDEND = function(str,end){
    let _text = str;
    let newEnd = end;
    let _reg = /\d/;
    while (_text[newEnd] !== '_' && !_reg.test(_text[newEnd]) && (newEnd) < _text.length) {
        newEnd++;
    }
    return newEnd;
};
const PHONEMASK = function(str, end){
    let text = str.replace(/\D/gim,'');
    let _text = `+${text[0] || '_'} (${text[1] || '_'}${text[2] || '_'}${text[3] || '_'}) ${text[4] || '_'}${text[5] || '_'}${text[6] || '_'}-${text[7] || '_'}${text[8] || '_'}-${text[9] || '_'}${text[10] || '_'}`;

    return  {
        text: _text,
        end: FINDEND(_text,end)
    };
};
const DATEMASK = function(str, end){
    let text = str.replace(/\D/gim,'');
    let _text = `${text[0] || '_'}${text[1] || '_'}.${text[2] || '_'}${text[3] || '_'}.${text[4] || '_'}${text[5] || '_'}${text[6] || '_'}${text[7] || '_'}`;

    return {
        text: _text,
        end: FINDEND(_text,end)
    };
};


class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {text: this._toMask(props.text, props.format, 0).text, enabled: props.enabled === false ? false : true, format: props.format};
    }

    _onChange(event){
        let _props = this._toMask(event.target.value, this.state.format, event.target.selectionStart);
        this.setState({text: _props.text},
            () => {
                this.refs.input.selectionStart = this.refs.input.selectionEnd = _props.end
            });
    }

    _toMask (text, maskName, end){
        let mask = maskName === 'phone' ? PHONEMASK : maskName === 'date' ? DATEMASK : (_text,end) => {
            return {text: _text, end: end};
        };

        return mask(text, end);
    }

    getValue(){
        let text = this.state.text;
        if(this.state.format) {
            text = text.replace(/_/g,'');
        }
        return text;
    }

    isEmpty(){
        return this.getValue() === this._toMask('', this.state.format, 0).text.replace(/_/g,'');
    }

    render() {
        return (
            <div className={('TextBox ' + (this.props.className || ''))} >
                <input ref={'input'} type="text" title={this.state.text} value={this.state.text} disabled={!this.state.enabled} onChange={(...args)=>{this._onChange.apply(this,args)}}/>
            </div>
        );
    }
}

export default TextBox;
