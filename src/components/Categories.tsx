import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";
import { SketchPicker } from "react-color";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Form, Input, Button, Modal, Table, Tag, Select, Space } from "antd";

type Mode = "new" | "edit" | "delete";

const defaultForm: CategoryForm= {
  name: "",
  type: "income",
  color: "black",
};
function Categories() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: AppState) => state.category
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState<CategoryForm>(defaultForm);
  const [mode, setMode] = useState<Mode>("new");
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") dispatch(addCategory(form));
    else if (mode === "edit" && typeof updateId === "number")
      dispatch(editCategory(form, updateId));
    else if (mode === "delete" && typeof deleteId === "number")
      dispatch(deleteCategory(deleteId));
    setForm(defaultForm);
    setIsModalVisible(false);
    setMode("new");
    setUpdateId(null);
    setDeleteId(null);
  };

  const handleCancel = () => {
    setForm(defaultForm);
    setIsModalVisible(false);
    setMode("new");
    setUpdateId(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toLocaleUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, category: Category) => (
        <Space size="middle">
          <EditFilled
            name="Edit"
            style={{ cursor: "pointer", color: "green" }}
            onClick={() => {
              showModal("edit");
              setUpdateId(category.id);
              setForm(category);
            }}
          />
          <DeleteFilled
            name="Delete"
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              showModal("delete");
              setDeleteId(category.id);
            }}
          />
        </Space>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <React.Fragment>
      <div>
        <Button type="primary" onClick={() => showModal("new")}>
          Open Modal
        </Button>
        <Modal
          title={
            mode === "new"
              ? "Create New Category"
              : mode === "edit"
              ? "Update Category"
              : "Delete Category"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled:!(mode==="delete") && !form.name }}
        >
          {mode === "new" || mode === "edit" ? (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Category Name">
                <Input
                  value={form.name}
                  name="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Category Type">
                <Select
                  defaultValue="income"
                  value={form.type}
                  onChange={(type) => setForm({ ...form, type })}
                >
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expence</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Select Color">
                <SketchPicker
                  color={form.color}
                  onChange={(color) => setForm({ ...form, color: color.hex })}
                />
              </Form.Item>
            </Form>
          ) : mode === "delete" ? (
            <>Are you Sure</>
          ) : null}
        </Modal>
        <Table loading={loading} dataSource={data} columns={columns} rowKey={"id"} />
      </div>
    </React.Fragment>
  );
}

export default Categories;
