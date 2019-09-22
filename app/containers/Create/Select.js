import React, { Component } from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';

export default class SelectMember extends Component {
  state = {
   // tags: [ ],
    inputVisible: false,
  };
  // handleClose = removedTag => {
  //   const tags = this.state.tags.filter(tag => tag !== removedTag);
  //   console.log(tags);
  //   this.setState({ tags });
  // };
  handleCloseTag = (ok) => {
    this.props.handleTagRemove()
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };
  /*
  handleInputEnter = () => {
    /*
    const { inputValue } = this.state;
    let { tags } = this.props;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
    //this.props.handleInputConfirm()
    
     
    this.props.handleAddTag(this.state.inputValue);
   }; */
  
  handleInputChange = e => {
    this.props.handleTagChange(e.target.value)
   // console.log(e.target.value);
  };

  handleInputEnter = () => {
    this.props.handleTagSubmit();
    this.setState({inputVisible: false});
  }

  saveInputRef = input => (this.input = input);
  render() {
    const { inputVisible } = this.state;
    const { tagValue, tags } = this.props;
    return ( 
       <div>
       <br />
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={true} onClose={() => this.handleCloseTag(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={tagValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputEnter}
            onPressEnter={this.handleInputEnter}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> Add contributor
          </Tag>
        )}
      </div>
    );
  }
  }