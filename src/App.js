import React, {Component} from 'react';
import './App.css';
import {Table, Layout, Menu, Breadcrumb} from 'antd';

const {Header, Content, Footer} = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    render() {
        const columns = [{
            title: 'thumbnail',
            key: 'thumbnail',
            dataIndex: 'data',
            width: '7%',
            render: (data) => (
                <span>
                    <img color="blue" alt="" src={data.thumbnail} height={data.thumbnail_height}
                         width={data.thumbnail_width}></img>
                </span>
            ),
        }, {
            title: 'title',
            dataIndex: 'data',
            key: 'title',
            width: '60%',
            render: (data) => {
                let link = "https://www.reddit.com/r/subreddit/comments/" + data.id;
                return (<a href={link}>{data.title}</a>)
            }
        }, {
            title: 'num_comments',
            dataIndex: 'data.num_comments',
            key: 'num_comments',
            width: '10%',
            render: text => <div>{text}</div>,
        },];
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
                        <Breadcrumb.Item>Reddit List Table</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                        <Table columns={columns} dataSource={this.state.data}/>
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
