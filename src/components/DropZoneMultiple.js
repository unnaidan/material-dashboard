import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/styles'
import {
    Fab,
    Button,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    LinearProgress,
    CircularProgress,
    Avatar
} from '@material-ui/core'
import {
    Plus,
    Download,
    Close
} from 'mdi-material-ui'
import mime from 'mime'
import axios from './../plugins/axios'

const styles = theme => ({
    input: {
        display: 'none'
    },
    uploader: {
        position: 'relative',
        display: 'block',
        textAlign: 'center',
        border: '2px dashed rgba(0, 0, 0, 0.12)',
        backgroundColor: '#fff',
        color: '#43425d',
    },
    hasError: {
        borderColor: 'rgba(245, 0, 81, 0.2)',
        color: '#f50057'
    },
    inner: {
        padding: theme.spacing(4, 2)
    },
    content: {
        paddingBottom: 27
    },
    uploaderImage: {
        display: 'inline-block',
        width: 'auto',
        height: 80
    },
    typography: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        fontWeight: 300
    },
    button: {
        padding: '6px 24px'
    },
    circularProgress: {
        position: 'absolute',
        top: theme.spacing(2),
        bottom: 'auto',
        right: theme.spacing(2),
        left: 'auto'
    },
    avatar: {
        borderRadius: 0
    },
    fab: {
        position: 'absolute',
        top: 'auto',
        left: 'auto',
        right: theme.spacing(2),
        bottom: -29
    }
})

const extensions = [
    'csv', 'jpeg', 'jpg', 'mp4', 'pdf', 'png', 'ppt', 'rar', 'svg', 'xls', 'zip'
]


class DropZoneMultiple extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: {},
            progress: 0,
            uploading: false
        }
    }

    uploadFile = async e => {
        try {
            this.setState({
                errors: {},
                progress: 0,
                uploading: true
            })

            const formData = new FormData()
            formData.append('file', e.target.files[0])

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                onUploadProgress: event => {
                    const { total, loaded } = event
                    const progress = Math.round(loaded / total * 100)

                    this.setState({ progress })
                }
            }

            const { uploadPath } = this.props
            const { path } = await axios.post(uploadPath, formData, config)

            this.setState({
                uploading: false
            })

            const { onChange } = this.props
            onChange(path)
        } catch (err) {
            if (err.response.status === 422) {
                const { errors } = err.response.data
                this.setState({
                    errors,
                    uploading: false
                })
            }
        }
    }

    removeFile = path => () => {
        const { onChange } = this.props
        onChange(path, false)
    }

    filePath = path => {
        return `${process.env.REACT_APP_API_URL}/${path}`
    }

    fileExtension = path => {
        const type = mime.getType(path)
        const value = mime.getExtension(type)

        return value
    }

    avatarSrc = path => {
        const ext = this.fileExtension(path)
        const fileName = extensions.includes(ext) ? ext : 'default'

        return `/static/images/files/${fileName}.png`
    }

    render() {
        const {
            errors,
            progress,
            uploading
        } = this.state
        const {
            classes,
            files
        } = this.props
        const {
            input,
            uploader,
            uploaderImage,
            hasError,
            inner,
            content,
            typography,
            button,
            circularProgress,
            avatar,
            fab
        } = classes

        const empty = (
            <div>
                {uploading &&
                    <div>
                        <CircularProgress
                            className={circularProgress}
                            variant="static"
                            color="inherit"
                            value={100}
                            style={{
                                opacity: 0.2
                            }}
                        />
                        <CircularProgress
                            className={circularProgress}
                            variant="static"
                            value={progress}
                        />
                    </div>
                }
                <div className={inner}>
                    <img
                        className={uploaderImage}
                        src="/static/images/box.png"
                        alt="box"
                    />
                    <Typography
                        variant="subtitle1"
                        className={typography}
                        align="center"
                        children="Файл хуулахын тулд доорх товч дээр дарна уу"
                    />
                    <label>
                        <input
                            className={input}
                            onChange={this.uploadFile}
                            disabled={uploading}
                            type="file"
                        />
                        <Button
                            className={button}
                            disabled={uploading}
                            component="span"
                            variant="contained"
                            color="primary"
                        >
                            Файл хуулах
                        </Button>
                    </label>
                </div>
            </div>
        )

        const fileManager = (
            <div>
                <label>
                    <input
                        className={input}
                        onChange={this.uploadFile}
                        disabled={uploading}
                        type="file"
                    />
                    <Fab
                        className={fab}
                        disabled={uploading}
                        component="span"
                        color="primary"
                    >
                        <Plus />
                    </Fab>
                </label>
                <div className={content}>
                    <List>
                        {files.map((file, index) =>
                            <ListItem
                                key={index}
                                divider={uploading || index < files.length - 1}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={this.avatarSrc(file)}
                                        className={avatar}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    secondary="173 KB"
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="start"
                                        color="default"
                                        href={this.filePath(file)}
                                        target="_blank"
                                    >
                                        <Download />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        color="secondary"
                                        onClick={this.removeFile(file)}
                                    >
                                        <Close />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                        {uploading &&
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar
                                        src="/static/images/files/default.png"
                                        className={avatar}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <LinearProgress
                                            value={progress}
                                            variant="determinate"
                                        />
                                    }
                                />
                            </ListItem>
                        }
                    </List>
                </div>
            </div>
        )

        return (
            <div>
                <div className={classNames(uploader, {
                    [hasError]: !!errors.file
                })}>
                    {files && files.length ? fileManager : empty}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(DropZoneMultiple)
