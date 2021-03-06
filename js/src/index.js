import React from 'react';
import ReactDOM from 'react-dom';
import { Spin, Result, Button, message } from 'antd';
import BaseTable from './BaseTable';
import SubmitButton from './SubmitButton';
import "./grid-import.css";

class ImportGrid extends React.Component{

    constructor(props){
        super(props);


        this.state = { data: null, submitting: false, importSuccess: false };
        this.updateState = this.updateState.bind(this);
        this.importSuccess = this.importSuccess.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
        // const that = this;
        // fetch(this.props.getDataUrl).then(function(res){
        //     if(res.ok){
        //     return res.json();
        //     }
        //     else{
        //     throw 'something go error, status:' . res.status;
        //     }
        // }).then(function(data){
        //     that.setState({ data });
        // });

        this.setState({ data: this.props.data })
    }

    updateState(data){
        const state_data = this.state.data;
        state_data.row_data = data;
        this.setState({ data: state_data });
    }

    importSuccess(){
        this.setState({ importSuccess: true });
    }

    error(msg = ''){
        let err_msg;
        if(msg == ''){
            err_msg = '导入失败，点击错误提示查看原因！'
        }
        else{
            err_msg = msg;
        }
        message.error(err_msg);
    }

    redirect(){
        location.href = this.props.redirect;
    }

    render(){
        if(this.state.importSuccess){
            return <Result
                status="success"
                title="导入成功"
                subTitle=""
                extra={[
                <Button type="primary" key="confirm" onClick={ this.redirect }>
                    确定
                </Button>
            ]}></Result>
        }

        if(this.state.data) {
            return (<div>
                    <SubmitButton data={ this.state.data } submiturl={ this.props.submitUrl } success={ this.importSuccess } update={ this.updateState } showerr={ this.error } style={{ marginBottom: "5px" }} />
                    <BaseTable columns={ this.state.data.columns } row_data={ this.state.data.row_data} updatestate={ this.updateState }/>
                </div>)
        }
        else {
            return (<div style={{ width: "100vw", height:"100vh", display: "flex",  justifyContent: "center", alignItems: "center"}}>
                    <Spin size="large" />
                </div>);
        }
    }
}

function importGrid(id, opt){
    const defaultOpt = { submitUrl: '', successRedirectUrl: '', data: null};
    Object.assign(defaultOpt, opt);
    ReactDOM.render(<ImportGrid submitUrl={ defaultOpt.submitUrl } redirect={ defaultOpt.successRedirectUrl } data={ defaultOpt.data} />, document.getElementById(id));
}
  
window.importGrid = importGrid;