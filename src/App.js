import React, {Component} from 'react';
import './App.css';
import {Table, Divider, Tag, Layout, Menu, Breadcrumb} from 'antd';

const {Header, Content, Footer} = Layout;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    handleChange(date) {
        //   message.info('您选择的日期是: ' + (date ? date.toString() : ''));
        //    this.setState({ date });
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'data.author_fullname',
            key: 'author_fullname',
            width: 200,
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'thumbnail',
            key: 'thumbnail',
            dataIndex: 'data.thumbnail',
            width: 100,
            render: thumbnail => (
                <span>
      <img color="blue" src={thumbnail} height="42" width="42"></img>
    </span>
            ),
        }, {
            title: 'title',
            dataIndex: 'data.title',
            key: 'title',
            width: 300,
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'num_comments',
            dataIndex: 'data.num_comments',
            key: 'num_comments',
            width: 10,
            render: text => <a href="javascript:;">{text}</a>,
        },{
            title: 'id',
            dataIndex: 'data.id',
            key: 'id',
            width: 300,
            render: text => <a href="javascript:;">{text}</a>,
        },  {
            title: 'subreddit_subscribers',
            key: 'subreddit_subscribers',
            width: 200,
            render: (text, record) => (
                <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical"/>
      <a href="javascript:;">Delete</a>
    </span>
            ),
        }];
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
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                        <Table columns={columns} dataSource={this.state.data}/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        );
    }


    componentDidMount() {
        fetch("https://www.reddit.com/r/subreddit/new.json?sort=new").then(res => res.json()).then((result) => {
                console.log(result.data.children);
                this.setState({
                    data: result.data.children,
                })
            }
        )
    }
}

export default App;
