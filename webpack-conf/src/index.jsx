import * as $ from 'jquery'
import Post from '@models/Post'
import React from 'react'
import {render} from 'react-dom'

// import json from './assets/json'
import Logo from './assets/webpack-logo'
// import Xml from './assets/data.xml'
// import Csv from './assets/data.csv'

import './babel'


import './styles/styles.css'
import './styles/less.less'
import './styles/scssh.scss'

const App = () => {
    return (
        <div className="container">
            <h1>Web course</h1>

            <hr />

            <div className="logo" />

            <hr />

            <pre />

            <hr />

            <div className="box">
                <h2>les</h2>
            </div>

            <div className="card">
                <h2>scddfs</h2>
            </div>
        </div>
    )
}
render(<App />, document.getElementById('app'))

// const post = new Post('wpt', Logo)

// $('pre').addClass('code2').html(post.toString())

