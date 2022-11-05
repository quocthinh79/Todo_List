import { Modal } from "bootstrap";
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";

function ToDoItemComponent({
  ThuTuCongViec,
  CongViecCanLam,
  // LoaiCongViec,
  NgayDenHan,
  ThoiGianConLai,
  TrangThai,
  disabledDelete = true,
  disabledEdit = true,
  removeId,
  openModalEdit,
  setToDo,
  // setTypeToDoState,
  setDateToDo,
  setIdItemEdit,
}) {
  return (
    <div>
      <div>Thứ tự công việc: {ThuTuCongViec}</div>
      <div>Công việc cần làm: {CongViecCanLam}</div>
      {/* <div>Loại công việc: {LoaiCongViec}</div> */}
      <div>Ngày đến hạn: {NgayDenHan}</div>
      <div>Thời gian còn lại trước khi hết hạn: {ThoiGianConLai}</div>
      <div>Trạng thái công việc: {TrangThai}</div>
      <Button onClick={() => removeId(ThuTuCongViec)}>
        Xóa
      </Button>
      <Button
        // disabled={disabledEdit}
        onClick={() => {
          setIdItemEdit(ThuTuCongViec);
          setToDo(CongViecCanLam);
          // setTypeToDoState(LoaiCongViec);
          setDateToDo(NgayDenHan);
          openModalEdit();
        }}
      >
        Sửa
      </Button>
      <br />
    </div>
  );
}

export default ToDoItemComponent;
