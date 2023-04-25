import Card from 'react-bootstrap/Card';
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import dynamic from 'next/dynamic';
import '../node_modules/react-quill/dist/quill.snow.css';
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import Image from 'next/image';
// import { DateTimeField } from 'react-bootstrap-datetimepicker';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' }
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    // imageResize: {
    //     parchment: QuillNoSSRWrapper.import('parchment'),
    //     modules: ['Resize', 'DisplaySize']
    //  }
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]

export default function CollCreationForm(props) {

    const [title, setTitle]   = useState("Silver Surver");
    const [desc, setDesc]     = useState("");
    const [extURL, setExtURL] = useState("");
    const [price, setPrice]   = useState(0.08);
    const [supply, setSupply] = useState(20);
    const [generator_ipfs_uri, setGeneratorIpfsUri] = useState("");
    const [generator_src, setGeneratorSrc] = useState("");
    const [date_time, setDateTime] = useState(new Date());
    const [checked, setChecked] = useState(true);
    const [fund_deadline, setFundDeadline] = useState(new Date());
    const [fund_goal, setFundGoal] = useState(-1);
    const [has_goal, setHasGoal] = useState(false);

    return (
        <Form>
            <div className="spacer-60" />
                
            <a dataBsToggle="tooltip" title="Instructions on how to create a collection" target={"_blank"} href={`https://docs.lay3rz.xyz/launch-your-collection`} className="instructionsATag">Instructions</a>
            <div className="spacer-40" />
            <Form.Group>  
                
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Upload Folder</Form.Label>
                <div className="d-create-file">
                    {/* <p ref={refUplLd} style={{display: "none"}}><i className="fa fa-spinner fa-pulse"></i> Uploading...</p> */}
                    <Form.Control /*ref={refUplBr}*/ type="button" id="get_file" bsPrefix="my_btn_main" value="Browse" />
                    {/* <input type="file" id="upload_file" webkitdirectory="true" mozdirectory="true" onChange={upload_generator} /> */}
                </div>
            </Form.Group>
            <div className="spacer-40" />

            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Title</Form.Label>
                <Form.Control type="text" name="item_title" id="item_title" bsPrefix="form-control my_form_control" placeholder="e.g. 'Crypto Funk" defaultValue="" onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <div className="spacer-40" />

            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Description</Form.Label>
                <QuillNoSSRWrapper placeholder="e.g. 'This is very limited collection!'" onChange={content => setDesc(content)} modules={modules} formats={formats} theme="snow" />
            </Form.Group>    
            <div className="spacer-40" />

            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>External URL (Optional)</Form.Label>
                <Form.Control type="text" name="item_royalties" id="item_royalties" bsPrefix="form-control my_form_control" placeholder="E.g. www.google.com" defaultValue="" onChange={e => setExtURL(e.target.value)} />
            </Form.Group> 
            <div className="spacer-40" />

            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Price Per Token</Form.Label>
                <Form.Control type="text" name="item_royalties" id="item_royalties" bsPrefix="form-control my_form_control" placeholder="E.g. 2.5 ꜩ" defaultValue="" onChange={e => setPrice(e.target.value)} />
                <div className="spacer-40" />
            </Form.Group>

            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Max Supply</Form.Label>
                <Form.Control type="text" name="item_royalties" id="item_royalties" bsPrefix="form-control my_form_control" placeholder="E.g. 25" defaultValue="" onChange={e => setSupply(e.target.value)} />
            </Form.Group>
            <div className="spacer-40" />


            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Sale Start Time</Form.Label>&nbsp;&nbsp;
                <DateTimePicker onChange={setDateTime} value={date_time} />
                {/* <DateTimeField /> */}
            </Form.Group>
            <div className="spacer-30" />

            <Form.Group>
                {(has_goal === false)
                    ? <a className='my_btn_main' onClick={() => setHasGoal(true)} href="#!">
                        Set Goal&nbsp;&nbsp;
                        <Image src="/angle-down.svg" width={15} height={15} style={{position: 'relative', top: "-1px"}} />
                      </a>
                    : 
                        <>
                            <Form.Label className="index_title" style={{fontSize: "18px"}}>Goal</Form.Label>
                            <Form.Control type="text" name="item_royalties" id="item_royalties"  bsPrefix="form-control my_form_control" placeholder="E.g. 100.5 ꜩ" defaultValue="" onChange={e => setFundGoal(e.target.value)} />
                            <div className="spacer-30" />
                            <Form.Label className="index_title" style={{fontSize: "18px"}}>Deadline</Form.Label>&nbsp;&nbsp;
                            <DateTimePicker onChange={setFundDeadline} value={fund_deadline} />
                            <div className="spacer-single"></div>
                            <a className='my_btn_main' onClick={() => setHasGoal(false)} href="#!" style={{paddingLeft: "24px", paddingRight: "24px"}}>
                                Remove Goal&nbsp;&nbsp;
                                <Image src="/angle-up.svg" width={15} height={15} style={{position: 'relative', top: "-1px"}} />
                            </a>
                        </>
                }
            </Form.Group>

            <div className="spacer-40" />

            
            <Form.Group>
                <Form.Label className="index_title" style={{fontSize: "18px"}}>Enabled</Form.Label>&nbsp;&nbsp;
                <Form.Check inline checked={checked} type="checkbox" id="my_checkbox" /*bsPrefix="form-check my_checkbox_class"*/ onChange={x => {setChecked(!checked);}} /*label="Enabled"*/ />
                {/* <Form.Control id="my_checkbox" type="checkbox" onChange={x => {setChecked(!checked);}} /> */}
            </Form.Group>    
            <div className="spacer-30" />
            <Form.Control disabled={!title || !desc || !supply || !price} type="button" id="create_coll_btn" bsPrefix="my_btn_main" value="Create Collection" />
            <div className="spacer-40" />
        </Form>
    )
}