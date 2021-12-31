import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getCategories } from "../store/actions/categoryActions";
import {
  addRecord,
  deleteRecord,
  editRecord,
  getRecords,
} from "../store/actions/recordActions";
import { Category } from "../types/category";
import { Record, RecordForm } from "../types/record";

type Mode = "new" | "edit" | "delete";

const defaultForm: RecordForm = {
  title: "",
  category_id: 0,
  amount: 0,
};
function Records() {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.record
  );
  const category = useSelector((state: AppState) => state.category.data);
  //Local State
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(defaultForm);
  const [deleteid, setDeleteid] = useState<number | null>(null);
  const [update, setUpdate] = useState<number | null>(null);

  const dispatch = useDispatch();

  const columns = [
    {
      title: "Titlle",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"]) => {
        return (
          <>
            {Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category) => {
        return category.name;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: string, record: Record) => (
        <Space size="middle">
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              showModal();
              setMode("delete");
              setDeleteid(record.id);
            }}
          />
          <EditOutlined
            style={{ cursor: "pointer", color: "green" }}
            onClick={() => {
              showModal();
              setMode("edit");
              setUpdate(record.id);
              setForm({
                title: record.title,
                amount: record.amount,
                category_id: record.category.id,
              });
            }}
          />
        </Space>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updateAt:string,record: Record) => {
        const updateObj = new Date(updateAt)
        return (
          <>
            {updateObj.toLocaleDateString()} {" "}
            {updateObj.toLocaleTimeString()}
          </>
        )
      },
    },
  ];
  useEffect(() => {
    dispatch(getRecords());
    !category.length && dispatch(getCategories());
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (mode === "new") {
      dispatch(addRecord(form));
    } else if (mode === "delete" && typeof deleteid === "number") {
      dispatch(deleteRecord(deleteid));
      setDeleteid(null);
      setMode("new");
    }else if(mode==="edit" && typeof update==="number"){
      dispatch(editRecord(form,update))
      setMode("new")
      setUpdate(null)
    }
    setForm(defaultForm);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDeleteid(null);
    setMode("new");
  };

  return (
    <React.Fragment>
      <Button type="primary" danger onClick={showModal}>
        ADD NEW RECORD
      </Button>
      <Modal
        title={
          mode === "new"
            ? "ADD NEW RECORD"
            : mode === "delete"
            ? "DELETE RECORD"
            : "EDIT RECORD"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {mode === "new" || mode === "edit" ? (
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Form.Item label="Title">
              <Input
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Amount">
              <Input
                name="amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: parseInt(e.target.value) })
                }
              />
            </Form.Item>
            <Form.Item label="Category">
              <Select
                defaultValue={form.category_id}
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e })}
              >
                <Select.Option value={0} disabled>
                  Select a category
                </Select.Option>
                {category.map((category) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        ) : mode === "delete" ? (
          <>Are you Sure ?</>
        ) : null}
      </Modal>
      <Table
        columns={columns}
        dataSource={data.map((value, index) => ({ key: index, ...value }))}
        loading={loading}
      />
    </React.Fragment>
  );
}

export default Records;
