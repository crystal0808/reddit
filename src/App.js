import React, {Component} from 'react';
import './App.css';
import {Table, Layout, Menu, Breadcrumb, Tabs} from 'antd';

const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    callback(key) {
        console.log(key);
        let query = 'hot';
        if (key == 2) {
            query = 'new';
        } else if (key == 3) {
            query = 'top';
        }
        let url = "https://www.reddit.com/r/subreddit/" + query + ".json";
        fetch(url).then(res => res.json()).then((result) => {
            console.log(result.data.children)
                this.setState({
                    data: result.data.children,
                })
            }
        )
    }

    render() {
        const columns = [{
            title: 'thumbnail',
            key: 'thumbnail',
            dataIndex: 'data',
            width: '7%',
            render: (data) => (
                <span>
                    <img color="blue" alt="" src={data.thumbnail} height= '70'
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
        }, ];
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content >
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                            <TabPane tab="Hot" key="1">
                                <Table showHeader = {false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                            <TabPane tab="New" key="2">
                                <Table showHeader = {false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                            <TabPane tab="Top" key="3">
                                <Table showHeader = {false} columns={columns} dataSource={this.state.data}/>
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
        fetch("https://www.reddit.com/r/subreddit/new.json?sort=new").then(res => res.json()).then((result) => {
                this.setState({
                    data: result.data.children,
                })
            }
        )
    }
}

export default App;
