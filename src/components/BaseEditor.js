import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export default class BaseDatePicker extends Component {
    render() {
        const {
            value,
            onChange,
        } = this.props
        const { REACT_APP_TINY_MCE_API_KEY } = process.env

        return (
            <Editor
                initialValue={value}
                onChange={onChange}
                apiKey={REACT_APP_TINY_MCE_API_KEY}
                init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                        'link', 'lists', 'fullscreen'
                    ],
                    toolbar: [
                        'undo redo | link | bold | fullscreen',
                        'numlist bullist | alignleft aligncenter alignright alignjustify | h1 h2 h3 | blockquote'
                    ]
                }}
            />
        )
    }
}
