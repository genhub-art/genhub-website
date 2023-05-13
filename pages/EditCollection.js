import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Title from '../components/Title';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


export default function EditCollection(props) {
    
    const [date_time, setDateTime] = useState(new Date());
    const [add_whitelists_next, setAddWhitelistsNext] = useState("");
    const [rmv_whitelists_next, setRmvWhitelistsNext] = useState("");
    const [add_whitelists, setAddWhitelists] = useState([]);
    const [rmv_whitelists, setRmvWhitelists] = useState([]);
    const [checked, setChecked] = useState(true);
    const [check_white, setCheckWhite] = useState(true);

    return (
    <div>
        <Title title="Edit Collection" />
        <Container>    
          <Row>
              <Col lg={{span: 7, offset: 1}}>
                <Form>
                    <div className="spacer-60" />

                    <Form.Group>
                        <Form.Label className="index_title" style={{fontSize: "18px"}}>Admin</Form.Label>
                        <Form.Control type="text" name="item_title" id="item_title" bsPrefix="form-control my_form_control" placeholder="e.g. 'Crypto Funk" defaultValue="" onChange={e => setAdmin(e.target.value)} />
                    </Form.Group>
                    <div className="spacer-40" />

                    <Form.Group>
                        <Form.Label className="index_title" style={{fontSize: "18px"}}>Price Per Token</Form.Label>
                        <InputGroup>
                            <Form.Control type="text" name="item_royalties" id="item_royalties" bsPrefix="form-control my_form_control" 
                                            placeholder="E.g. 2.5 BNB" defaultValue="" onChange={e => setPrice(e.target.value)} />
                            <InputGroup.Text>
                                <Image width={27} height={27} src="/bnb_logo.png" alt="" />&nbsp;BNB
                            </InputGroup.Text>
                        </InputGroup>
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
                    <div className="spacer-40" />
                    
                    <Form.Group>
                        <Form.Label className="index_title" style={{fontSize: "18px"}}>Enabled</Form.Label>&nbsp;&nbsp;
                        <Form.Check inline checked={checked} type="checkbox" id="my_checkbox" /*bsPrefix="form-check my_checkbox_class"*/ onChange={x => {setChecked(!checked);}} /*label="Enabled"*/ />
                        {/* <Form.Control id="my_checkbox" type="checkbox" onChange={x => {setChecked(!checked);}} /> */}
                    </Form.Group>
                    <div className="spacer-30" />
                    <Form.Group>
                        <Form.Label className="index_title" style={{fontSize: "18px"}}>Use Whitelist</Form.Label>&nbsp;&nbsp;
                        <Form.Check inline checked={check_white} type="checkbox" id="my_checkbox" /*bsPrefix="form-check my_checkbox_class"*/ onChange={x => {setCheckWhite(!check_white);}} /*label="Enabled"*/ />
                        {/* <Form.Control id="my_checkbox" type="checkbox" onChange={x => {setChecked(!checked);}} /> */}
                    </Form.Group>
                    <div className="spacer-30" />
                    <Form.Group>
                        <Form.Label className="index_title" style={{fontSize: "18px"}}>Add to Whitelist</Form.Label>
                        <div className="spacer-10" />
                        <Form.Control /*type="number"*/ type="text" name="item_royalties" id="item_royalties2" value={add_whitelists_next} bsPrefix="form-control my_form_control" placeholder="E.g. tz12j..." onChange={e => setAddWhitelistsNext(e.target.value)} /> 
                        {(add_whitelists_next === "")
                            ? <a dataBsToggle="tooltip" title="Add" id="btn-add" className='my_btn_main' href='#!' style={{pointerEvents: "none", backgroundColor: "#D3D3D7"}}>+</a>
                            : <a dataBsToggle="tooltip" title="Add" id="btn-add" className='my_btn_main' href='#!' onClick={() => {if((!rmv_whitelists.includes(add_whitelists_next)) && (!add_whitelists.includes(add_whitelists_next)) && add_whitelists_next !== "") setAddWhitelists([...add_whitelists, ...[add_whitelists_next]]); setAddWhitelistsNext("")}}>+</a>
                        }
                        {(add_whitelists.length > 0) && <div className="spacer-5"></div>}
                        {
                            add_whitelists.map((el, idx) =>
                                <a key={`${idx}`} href="#!" dataBsToggle="tooltip" title={el}><div className="alert alert-dark align-items-center" role="alert" style={{padding: "5px", paddingRight: "23px", width: "fit-content", marginTop: "15px", marginRight: "5px", marginBottom: "0", display: "inline-block"}}>
                                    <div>
                                        {el.substring(0, 4) + "..." + el.substring(el.length - 4, el.length)} 
                                    </div>
                                    <a dataBsToggle="tooltip" title="Remove" href='#!' onClick={() => {setAddWhitelists(current => current.filter((el, i) => i !== idx))}}><FontAwesomeIcon icon={faClose} style={{position: "absolute", top: "2px", right: "2px", color: "#212529"}} /></a>
                                </div></a>
                        )}
                    </Form.Group>
                    {/* {console.log("Add whitelists", add_whitelists)} */}
                    <div className="spacer-30" />
                    <Form.Group>
                        <Form.Label className="index_title" style={{fontSize: "18px"}}>Remove from Whitelist</Form.Label>
                        <div className="spacer-10" />
                        <Form.Control /*type="number"*/ type="text" name="item_royalties" id="item_royalties2" value={rmv_whitelists_next} bsPrefix="form-control my_form_control" placeholder="E.g. tz12j..." onChange={e => setRmvWhitelistsNext(e.target.value)} />
                        {(rmv_whitelists_next === "")
                            ? <a dataBsToggle="tooltip" title="Add" id="btn-add" className='my_btn_main' href='#!' style={{pointerEvents: "none", backgroundColor: "#D3D3D7"}}>+</a>
                            : <a dataBsToggle="tooltip" title="Add" id="btn-add" className='my_btn_main' href='#!' onClick={() => {if((!rmv_whitelists.includes(rmv_whitelists_next)) && (!add_whitelists.includes(rmv_whitelists_next)) && rmv_whitelists_next !== "") setRmvWhitelists([...rmv_whitelists, ...[rmv_whitelists_next]]); setRmvWhitelistsNext("")}}>+</a>
                        }
                        {(rmv_whitelists.length > 0) && <div className="spacer-5"></div>}
                        {
                            rmv_whitelists.map((el, idx) =>
                                <a key={`${idx}`} href="#!" dataBsToggle="tooltip" title={el}><div className="alert alert-dark align-items-center" role="alert" style={{padding: "5px", paddingRight: "23px", width: "fit-content", marginTop: "15px", marginRight: "5px", marginBottom: "0", display: "inline-block"}}>
                                    <div>
                                        {el.substring(0, 4) + "..." + el.substring(el.length - 4, el.length)} 
                                    </div>
                                    <a dataBsToggle="tooltip" title="Remove" href='#!' onClick={() => {setRmvWhitelists(current => current.filter((el, i) => i !== idx))}}><FontAwesomeIcon icon={faClose} style={{position: "absolute", top: "2px", right: "2px", color: "#212529"}} /></a>
                                </div></a>
                        )}
                    </Form.Group>
                    
                    <div className="spacer-30" />
                    
                    <a target={"_blank"} rel={"noreferrer"} href={`https://docs.genhub.art/launch-your-collection`} className="instructionsATag">See Whitelist</a>    
                    <div className="spacer-30" />
                    
                    <Form.Control type="button" id="create_coll_btn" bsPrefix="my_btn_main" value="Edit Collection" />
                    <div className="spacer-60" />
                
                </Form>
              </Col>
          </Row>
        </Container>
    </div>
  )
}