import React, { useEffect, useState } from "react";
import axios from "axios";
import LinkedList from "../../../data-structure-and-algorithms/data-structures/linked-list/LinkedList";
import BinarySearchTreeMy from "../../../data-structure-and-algorithms/data-structures/tree/BinarySearchTreeMy";

function PhotoWithApiComponent() {
  const [treeText, setTreeText] = useState(new BinarySearchTreeMy());
  const [photosApi, setPhotoApi] = useState([]);
  const [resultDFS, setResultDFS] = useState(new LinkedList());

  const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;
    const right = [...arr];
    const middlePoint = arr.length / 2;
    const left = right.splice(0, middlePoint);
    return mergeUnsortedArrs(mergeSort(left), mergeSort(right));
  };

  const mergeUnsortedArrs = (left, right) => {
    const sortedItems = [];
    while (left.length && right.length) {
      if (left[0].id <= right[0].id) {
        sortedItems.push(left.shift());
      } else {
        sortedItems.push(right.shift());
      }
    }
    return [...sortedItems, ...left, ...right];
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then(function (response) {
        // handle success
        setPhotoApi(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  useEffect(() => {
    photosApi.forEach((item, index) => {
      setTreeText(treeText.insertTextObject(item));
    });
  }, [photosApi]);

  const dfs = (root, target) => {
    setResultDFS((pre) => (pre = new LinkedList()));
    if (root) {
      if (root.value.title.toLowerCase().includes(target.toLowerCase())) {
        setResultDFS(resultDFS.append(root.value));
      }
      dfs(root.left, target);
      dfs(root.right, target);
    }
  };
  const searchWithApi = (value) => {
    // if (value === "") value = " ";
    dfs(treeText.root, `${value}`);
    if (resultDFS.toArray().length <= 0) {
      setPhotoApi([
        {
          albumId: "null",
          id: "null",
          title: "null",
          url: "null",
          thumbnailUrl: "null",
        },
      ]);
    } else {
      setPhotoApi(resultDFS.toArray());
    }
  };
  return (
    <>
      {photosApi.length > 0 ? (
        <>
          <p className="fst-italic fs-5">Photos in API</p>

          <div class="input-group mb-3">
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                onClick={() => {
                  setPhotoApi(mergeSort(photosApi));
                }}
                class="btn btn-primary me-md-2"
                type="button"
              >
                Sort (Merge Sort)
              </button>
            </div>
            <span class="input-group-text" id="inputGroup-sizing-default">
              Search with title
            </span>
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Typing ..."
              onChange={(e) => searchWithApi(e.target.value)}
            />
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">albumId</th>
                <th scope="col">id</th>
                <th scope="col">title</th>
                <th scope="col">url</th>
                <th scope="col">thumbnailUrl</th>
              </tr>
            </thead>
            <tbody>
              {photosApi.map((item, index) => (
                <tr>
                  <th scope="row">{item.albumId}</th>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.url}</td>
                  <td>{item.thumbnailUrl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default PhotoWithApiComponent;
