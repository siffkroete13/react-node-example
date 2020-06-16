import React, { Component } from 'react';


class PostService extends Component {
    constructor(props) {
        super(props);
    }
    
    fetch(uri, method, body) {
        const response = fetch(uri, {
            method,
            body: body && JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
        }).then(res => {
            return res.json();
        }).catch(err => {
            return err;
        });
        return response;
    }

    render() { null; }
}

export default PostService;