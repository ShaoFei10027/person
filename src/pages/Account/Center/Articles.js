import React, { PureComponent } from 'react';
import { connect } from 'dva';

import PDF from 'react-pdf-js'

@connect(({ user }) => ({
  user,
}))
class Center extends PureComponent {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchPdf',
    });
  }

  render() {
    const pdfData = this.props.user.pdf.base64Data;
    let myPdf;
    if(pdfData){
      myPdf = (<PDF file={pdfData} />)
    }else{
      myPdf = (<canvas />)
    }
    return (
      <div>
        {myPdf}
      </div>
    );
  }
}

export default Center;
