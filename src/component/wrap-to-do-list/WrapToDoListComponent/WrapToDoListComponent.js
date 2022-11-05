import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LinkedList from "../../../data-structure-and-algorithms/data-structures/linked-list/LinkedList";
import Queue from "../../../data-structure-and-algorithms/data-structures/queue/Queue";
import Stack from "../../../data-structure-and-algorithms/data-structures/stack/Stack";
import BinarySearchTreeMy from "../../../data-structure-and-algorithms/data-structures/tree/BinarySearchTreeMy";

function WrapToDoListComponent() {
  const [modalShow, setModalShow] = useState(false);
  const toDo = useRef(null);
  const date = useRef(null);
  const [linkedList, setLinkedList] = useState(new LinkedList());
  const [array, setArrray] = useState([]);
  const [editModal, setEditModal] = useState(false);

  const [todo, setToDo] = useState("");
  const [dateToDo, setDateToDo] = useState("");
  const [idItemEdit, setIdItemEdit] = useState("");

  const toDoEdit = useRef(null);
  const dateEdit = useRef(null);

  const [tree, setTree] = useState(new BinarySearchTreeMy());

  const [deadline, setDeadline] = useState([]);
  const [workMuchTime, setWorkMuchTime] = useState([]);

  const [theoThuTuNhap, setTheoThuTuNhap] = useState(new Queue());
  const [theoThoiGianConLai, setTheoThoiGianConLai] = useState(new Stack());

  const [selectStatus, setSelectStatus] = useState("Chưa hoàn thành");

  const addToDo = () => {
    let diff = Math.round(
      (new Date(date.current.value.replace(/-/g, "/")) - new Date()) /
        (24 * 60 * 60 * 1000)
    );
    const obj = {
      ThuTuCongViec: linkedList.toArray().length + 1,
      CongViecCanLam: toDo.current.value,
      NgayDenHan: date.current.value,
      ThoiGianConLai: diff,
      TrangThai: "Chưa hoàn thành",
    };
    setLinkedList(linkedList.append(obj));
    setArrray(linkedList.toArray());
    setTree(
      tree.insert(
        Number.parseInt(obj.ThoiGianConLai) === -0
          ? 0
          : Number.parseInt(obj.ThoiGianConLai)
      )
    );
    setTheoThuTuNhap(theoThuTuNhap.enqueue(obj));

    const newArray = [...linkedList.toArray()];
    const newStack = new Stack();
    [...bubbleSort(newArray, "GIAMDAN")].forEach((item, index) => {
      setTheoThoiGianConLai(newStack.push(item));
    });
  };

  const bubbleSort = (array, type = "GIAMDAN") => {
    let isOrdered;
    switch (type) {
      case "GIAMDAN":
        for (let i = 0; i < array.length; i++) {
          isOrdered = true;
          for (let x = 0; x < array.length - 1 - i; x++) {
            if (array[x].ThoiGianConLai < array[x + 1].ThoiGianConLai) {
              [array[x], array[x + 1]] = [array[x + 1], array[x]];
              isOrdered = false;
            }
          }
          if (isOrdered) break;
        }
        break;
      case "TANGDAN":
        for (let i = 0; i < array.length; i++) {
          isOrdered = true;
          for (let x = 0; x < array.length - 1 - i; x++) {
            if (array[x].ThoiGianConLai > array[x + 1].ThoiGianConLai) {
              [array[x], array[x + 1]] = [array[x + 1], array[x]];
              isOrdered = false;
            }
          }
          if (isOrdered) break;
        }
        break;
      default:
        break;
    }
    return array;
  };

  const openModalEdit = () => {
    setEditModal(true);
  };

  const editToDo = (idEdit) => {
    setTree(tree.empty());
    array.forEach((item, index) => {
      if (item.ThuTuCongViec === idEdit) {
        item.CongViecCanLam = toDoEdit.current.value;
        item.NgayDenHan = dateEdit.current.value;
        item.ThoiGianConLai = Math.round(
          (new Date(dateEdit.current.value.replace(/-/g, "/")) - new Date()) /
            (24 * 60 * 60 * 1000)
        );
        item.TrangThai = selectStatus;
        setArrray(array);
      }
      setTree(
        tree.insert(
          Number.parseInt(item.ThoiGianConLai) === -0
            ? 0
            : Number.parseInt(item.ThoiGianConLai)
        )
      );
    });
    setEditModal(false);
    search();
    searchMax();
  };

  const removeId = (obj) => {
    linkedList.delete(obj);
    if (linkedList.toArray().length > 0) {
      setTree(tree.empty());
      linkedList.toArray().forEach((item, index) => {
        setTree(
          tree.insert(
            Number.parseInt(item.ThoiGianConLai) === -0
              ? 0
              : Number.parseInt(item.ThoiGianConLai)
          )
        );
      });
    }
    setArrray(linkedList.toArray());
  };

  useEffect(() => {
    search();
    searchMax();
  }, [array]);

  const search = () => {
    const thoiGianConLai = tree.findMin();
    setDeadline(
      array.filter((item, index) => item.ThoiGianConLai === thoiGianConLai)
    );
  };

  const searchMax = () => {
    const thoiGianConLai = tree.findMax();
    setWorkMuchTime(
      array.filter((item, index) => item.ThoiGianConLai === thoiGianConLai)
    );
  };

  const complete = (id) => {
    array.forEach((item, index) => {
      if (item.ThuTuCongViec === id) {
        array[index].TrangThai = "Hoàn thành";
        setArrray([...array]);
      }
    });
  };

  const lamTheoThuTuNhap = () => {
    let item = theoThuTuNhap.dequeue();
    if (item) {
      complete(item.ThuTuCongViec);
    }
  };

  const lamTheoThuTuThoiGianConLai = () => {
    let item = theoThoiGianConLai.pop();
    setTheoThoiGianConLai(theoThoiGianConLai);
    if (item) {
      complete(item.ThuTuCongViec);
    }
  };

  return (
    <div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center fs-1 fw-bold fst-italic">
        To do list
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-center">
        <button
          onClick={() => setModalShow(true)}
          class="btn btn-primary me-md-2"
          type="button"
        >
          Thêm
        </button>
        <button
          onClick={() => setArrray([...bubbleSort(array, "TANGDAN")])}
          class="btn btn-primary me-md-2"
          type="button"
        >
          Sắp xếp tăng dần
        </button>
        <button
          onClick={() => setArrray([...bubbleSort(array, "GIAMDAN")])}
          class="btn btn-primary me-md-2"
          type="button"
        >
          Sắp xếp giảm dần
        </button>
        <button
          onClick={() => lamTheoThuTuNhap()}
          class="btn btn-primary me-md-2"
          type="button"
        >
          Hoàn thành (Theo thứ tự nhập công việc - Queue)
        </button>
        <button
          onClick={() => lamTheoThuTuThoiGianConLai()}
          class="btn btn-primary me-md-2"
          type="button"
        >
          Hoàn thành (Theo thứ tự thời gian - Stack)
        </button>
      </div>
      {
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div>Công việc cần làm:</div>
            <input required ref={toDo} type="text" className="form-control" />
            <div>Ngày đến hạn:</div>
            <input required ref={date} type="date" className="form-control" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => addToDo()}>Thêm công việc</Button>
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      }
      {
        <Modal
          show={editModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div>Công việc cần làm:</div>
            <input
              ref={toDoEdit}
              defaultValue={todo}
              type="text"
              className="form-control"
            />
            <div>Ngày đến hạn:</div>
            <input
              ref={dateEdit}
              defaultValue={dateToDo}
              type="date"
              className="form-control"
            />
            <div>Trạng thái:</div>
            <select
              class="form-select"
              aria-label="Default select example"
              value={selectStatus}
              onChange={(e) => setSelectStatus(e.target.value)}
            >
              <option value="Chưa hoàn thàn">Chưa hoàn thành</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => editToDo(idItemEdit)}>Sửa công việc</Button>
            <Button onClick={() => setEditModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      }
      <p className="fst-italic fs-5">Tất cả công việc</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Công việc cần làm</th>
            <th scope="col">Ngày đến hạn</th>
            <th scope="col">Số ngày còn lại</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {array.map((item, index) => (
            <tr>
              <th scope="row">{item.ThuTuCongViec}</th>
              <td>{item.CongViecCanLam}</td>
              <td>{item.NgayDenHan}</td>
              <td>{item.ThoiGianConLai}</td>
              <td>{item.TrangThai}</td>
              <td>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    onClick={() => {
                      removeId(item.ThuTuCongViec);
                    }}
                    className="btn btn-danger me-md-2"
                    type="button"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => {
                      setIdItemEdit(item.ThuTuCongViec);
                      setToDo(item.CongViecCanLam);
                      setDateToDo(item.NgayDenHan);
                      openModalEdit();
                    }}
                    className="btn btn-primary"
                    type="button"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => {
                      complete(item.ThuTuCongViec);
                    }}
                    className="btn btn-success"
                    type="button"
                  >
                    Hoàn thành
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deadline.length > 0 ? (
        <>
          <p className="fst-italic fs-5">Công việc gần đến hạn</p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Công việc cần làm</th>
                <th scope="col">Ngày đến hạn</th>
                <th scope="col">Số ngày còn lại</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deadline.map((item, index) => (
                <tr>
                  <th scope="row">{item.ThuTuCongViec}</th>
                  <td>{item.CongViecCanLam}</td>
                  <td>{item.NgayDenHan}</td>
                  <td>{item.ThoiGianConLai}</td>
                  <td>{item.TrangThai}</td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        onClick={() => {
                          removeId(item.ThuTuCongViec);
                        }}
                        className="btn btn-danger me-md-2"
                        type="button"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => {
                          setIdItemEdit(item.ThuTuCongViec);
                          setToDo(item.CongViecCanLam);
                          setDateToDo(item.NgayDenHan);
                          openModalEdit();
                        }}
                        className="btn btn-primary"
                        type="button"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          complete(item.ThuTuCongViec);
                        }}
                        className="btn btn-success"
                        type="button"
                      >
                        Hoàn thành
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <></>
      )}
      {workMuchTime.length > 0 ? (
        <>
          <p className="fst-italic fs-5">
            Công việc có nhiều thời gian làm nhất
          </p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Công việc cần làm</th>
                <th scope="col">Ngày đến hạn</th>
                <th scope="col">Số ngày còn lại</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workMuchTime.map((item, index) => (
                <tr>
                  <th scope="row">{item.ThuTuCongViec}</th>
                  <td>{item.CongViecCanLam}</td>
                  <td>{item.NgayDenHan}</td>
                  <td>{item.ThoiGianConLai}</td>
                  <td>{item.TrangThai}</td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        onClick={() => {
                          removeId(item.ThuTuCongViec);
                        }}
                        className="btn btn-danger me-md-2"
                        type="button"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => {
                          setIdItemEdit(item.ThuTuCongViec);
                          setToDo(item.CongViecCanLam);
                          setDateToDo(item.NgayDenHan);
                          openModalEdit();
                        }}
                        className="btn btn-primary"
                        type="button"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          complete(item.ThuTuCongViec);
                        }}
                        className="btn btn-success"
                        type="button"
                      >
                        Hoàn thành
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default WrapToDoListComponent;
