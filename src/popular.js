import React, {Component} from 'react';
import "antd/dist/antd.css";
import './index.css';
import App from "./App";
import {Link} from "react-router-dom";
import {Table, Layout, Menu, Breadcrumb, Tabs} from 'antd';
const TabPane = Tabs.TabPane;
const {Header, Content, Footer} = Layout;
const columns = [{
    title: 'thumbnail',
    key: 'thumbnail',
    dataIndex: 'data',
    width: '7%',
    render: (data) => (
        <span>
                    <img color="blue" alt="" src={data.thumbnail} height='70'
                         width='70'></img>
                </span>
    ),
}, {
    title: 'title',
    dataIndex: 'data',
    key: 'title',
    width: '90%',
    render: (data) => {
        let link = "https://www.reddit.com/r/subreddit/comments/" + data.id;
        return (<div>
                <a href={link}>{data.title}</a>
                <div>{data.num_comments} comments</div>
            </div>
        )
    }
},];

class Popular extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            subreddit: 'popular',
            sortBy: 'hot',
        };
        console.log("ss")
        console.log(this.props)
    }
    callback(key) {
        console.log(key);
        let subreddit = this.state.subreddit;
        let sortBy = 'hot';
        if (key == 3) {
            sortBy = 'top';
        } else if (key == 2) {
            sortBy = 'new';
        }
        this.setState({sortBy: sortBy}, ()=> {this.getTableData()})
        //   this.getTableData(subreddit, sortBy);


    }

    getTableData() {
        let subreddit = this.state.subreddit;
        let sortBy = this.state.sortBy;
        console.log(subreddit)
        let url = "https://www.reddit.com/r/" + subreddit + "/" + sortBy + ".json";
        console.log(url)
        fetch(url).then(res => res.json()).then((result) => {
                console.log(result)
                this.setState({
                    data: result.data.children,
                })
            }
        )
    }
    callbackMenu(e) {
        console.log(e.key);
        let subreddit = this.state.subreddit;
        let sortBy = this.state.sortBy;
        console.log(subreddit)
        if (e.key == 2) {
            subreddit = 'popular';
        } else if (e.key == 3) {
            //get random subreddit
            let url4Random = "https://www.reddit.com/r/all/random.json";
            fetch(url4Random).then(res => res.json()).then((result) => {
                    console.log(result)
                    subreddit = result[0].data.children[0].data.subreddit;
                    console.log(subreddit)
                }
            )
        }
        console.log(subreddit)
        this.setState({subreddit: subreddit}, function(){this.getTableData()})
        //  this.getTableData(subreddit, sortBy);

    }
    render() {
        console.log("test")
        return (
            <Layout className="layout">
                <h1>Simple SPA</h1>
                <ul className="header">
                    <li><Link to="/popular">Popular</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                    <li><Link to="/message">Message</Link></li>
                </ul>
                {this.props.children}
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{lineHeight: '64px'}}
                    onClick={this.callbackMenu.bind(this)}
                >
                    <Menu.Item key="1"><Link to="/popular">Popular</Link></Menu.Item>
                    <Menu.Item key="2">ALL</Menu.Item>
                    <Menu.Item key="3">RANDOM</Menu.Item>
                </Menu>
                <Content>
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                            <TabPane tab="Hot" key="1">
                                <Table showHeader={false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                            <TabPane tab="New" key="2">
                                <Table showHeader={false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                            <TabPane tab="Top" key="3">
                                <Table showHeader={false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                        </Tabs>

                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Reddit test ©2018 Created by Crystal L
                </Footer>
            </Layout>
        );
    }
    componentDidMount() {
        fetch("https://www.reddit.com/r/popular/hot.json?sort=hot").then(res => res.json()).then((result) => {
                this.setState({
                    data: result.data.children,
                })
            }
        )
    }
}
export default Popular;