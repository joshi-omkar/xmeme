import { useState, useEffect } from "react";
import {  useParams } from 'react-router-dom';
import axios from 'axios';


const EditMeme =(props)=>{

  const {id} = useParams();
  const [name, setName] = useState('')
  const [caption, setCaption] = useState('')
  const [url, setUrl] = useState('')

  useEffect(()=>{
    console.log(id)
    axios.get('http://localhost:8081/memes/' + id)
            .then(response => {
                console.log(response.data);
                setName(response.data.name)
                setCaption(response.data.caption)
                setUrl(response.data.url)
            })
            .catch((err) => {
                console.log(err);
            })

  },[])

  const onSubmit = async (event)=> {
    event.preventDefault();

    const memePatch = {
        caption: caption,
        url: url
    }
    // PATCH req ( /meme/:id )
    await axios.patch('http://localhost:8081/memes/' + id, memePatch)
        .then(() => {
            alert('Success');
        })
        .catch(err => {
            alert(err);
            console.log(err);
        });

    window.location = "/";
}

return (
    //images is show from current state url and so is caption and url in their respective feild as default.
    <div className="container">
        <div className="container card">
            <img id="edit-meme" src={url} alt="meme" />
        </div>
        <hr />
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <h6 id="heading">Meme Owner</h6>
                <input
                    className="form-control"
                    required
                    id="name"
                    type="text"
                    value={name}
                    disabled
                />
            </div>
            <div className="form-group">
                <h6 id="heading">Caption</h6>
                <input
                    className="form-control"
                    required
                    id="caption"
                    type="text"
                    defaultValue={caption}
                    onChange={(e) => setCaption(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <h6 id="heading">Meme URL</h6>
                <input
                    className="form-control"
                    required
                    id="url"
                    type="url"
                    defaultValue={url}
                    onChange={(e) => setUrl(e.target.value)} 
                />
            </div>
            {/*button triggers patch request */}
            <input className="btn btn-primary" id="submit-btn" type="submit" value="Submit" />
        </form>
    </div>
)


}


// class EditMeme extends Component {
//     constructor(props) {
//         super(props);

//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             name: '',
//             caption: '',
//             url: '',
//         };

//     }
//     // mounts current details of the meme, GET (/memes/:id) end point
//     componentDidMount() {
//         axios.get('http://localhost:8081/' + this.props.match.params._id)
//             .then(response => {
//                 console.log(response.data);
//                 this.setState({
//                     name: response.data.name,
//                     caption: response.data.caption,
//                     url: response.data.url
//                 })
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }

//     // changes the state of (cation and url ) when changed in the form feild
//     onChange = (e) => {
//         this.setState({ [e.target.id]: e.target.value });
//     }

//     // asynchronous so that page waits on submit till the patch request completes, before redirecting back to root 
//     async onSubmit(event) {
//         event.preventDefault();

//         const memePatch = {
//             caption: this.state.caption,
//             url: this.state.url
//         }
//         // PATCH req ( /meme/:id )
//         await axios.patch('http://localhost:8081/' + this.props.match.params._id, memePatch)
//             .then(() => {
//                 alert('Success');
//             })
//             .catch(err => {
//                 alert(err);
//                 console.log(err);
//             });

//         window.location = "/";
//     }

//     render() {
//         return (
//             //images is show from current state url and so is caption and url in their respective feild as default.
//             <div className="container">
//                 <div className="container card">
//                     <img id="edit-meme" src={this.state.url} alt="meme" />
//                 </div>
//                 <hr />
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <h6 id="heading">Meme Owner</h6>
//                         <input
//                             className="form-control"
//                             required
//                             id="name"
//                             type="text"
//                             value={this.state.name}
//                             disabled
//                         />
//                     </div>
//                     <div className="form-group">
//                         <h6 id="heading">Caption</h6>
//                         <input
//                             className="form-control"
//                             required
//                             id="caption"
//                             type="text"
//                             defaultValue={this.state.caption}
//                             onChange={this.onChange}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <h6 id="heading">Meme URL</h6>
//                         <input
//                             className="form-control"
//                             required
//                             id="url"
//                             type="url"
//                             defaultValue={this.state.url}
//                             onChange={this.onChange}
//                         />
//                     </div>
//                     {/*button triggers patch request */}
//                     <input className="btn btn-primary" id="submit-btn" type="submit" value="Submit" />
//                 </form>
//             </div>
//         )
//     }
// }
export default EditMeme;