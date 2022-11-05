import React, { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import WrapToDoListComponent from "../../component/wrap-to-do-list/WrapToDoListComponent/WrapToDoListComponent";
import LinkedList from "../../data-structure-and-algorithms/data-structures/linked-list/LinkedList";

function ModalComponent(props) {
  const toDo = useRef(null);
  const typeToDo = useRef(null);
  const date = useRef(null);
  const linkedList = new LinkedList();

  // const onChange = () => {
  //   var diff = Math.abs(
  //     new Date(date.current.value.replace(/-/g, "/")) - new Date()
  //   );
  //   console.log(new Date(diff).toISOString().slice(11, 19));
  // };

  const addToDo = () => {
    const obj = {
      ThuTuCongViec: linkedList.toArray().length + 1,
      CongViecCanLam: toDo.current.value,
      LoaiCongViec: typeToDo.current.value,
      NgayDenHan: date.current.value,
      SoNgayConLaiTruocKhiHetHan: Math.abs(
        new Date(date.current.value.replace(/-/g, "/")) - new Date()
      ),
      TrangThai: "Chưa hoàn thành",
    };
    linkedList.append(obj);
    let temp = linkedList;
    console.log(temp);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Công việc cần làm:</div>
        <input required ref={toDo} type="text" class="form-control" />
        <div>Loại công việc:</div>
        <input required ref={typeToDo} type="text" class="form-control" />
        <div>Ngày đến hạn:</div>
        <input
          required
          // onChange={() => onChange()}
          ref={date}
          type="date"
          class="form-control"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => addToDo()}>Thêm công việc</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
