import React, {useRef} from 'react'

const UploadFile = ({onFileSelectError,onFileSelectSuccess}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {        
        const file = e.target.files[0];
        if (file.size > 1024000 || file.type !== 'text/csv'){             
          onFileSelectError({ error: "File size cannot exceed more than 10MB or invalid format"});
        }
        else onFileSelectSuccess(file);
    }

    return (
        <div className="file-uploader">
            <input type="file" name="" id="" onChange={handleFileInput}/>
            <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-warning"><i className='fa fa-refresh '></i></button>
        </div>
    )
}

export default UploadFile;