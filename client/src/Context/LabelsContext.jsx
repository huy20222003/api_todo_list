import { useReducer, useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { initLabelState, reducer } from '../Reducer/LabelsReducer/reducer';
import { Api_URL } from '../constant';
import {
  getAll,
  createLabel,
  editLabel,
  deleteLabel,
  searchLabel,
  setLabel
} from '../Reducer/LabelsReducer/action';

export const LabelsContext = createContext();

export const LabelsProvider = ({ children }) => {
    const [showAddLabel, setShowAddLabel] = useState(false);
    const [showEditLabel, setShowEditLabel] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(true);
    const [labelState, dispatch] = useReducer(reducer, initLabelState);

  const getAllLabels = async () => {
    try {
      const response = await axios.get(`${Api_URL}/label/all`);
      if (response.data.status) {
        dispatch(getAll(response.data.labels));
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };
  
  // Create
  const createLabels = async (LabelData) => {
    try {
      const response = await axios.post(`${Api_URL}/label/create`, LabelData);
      dispatch(createLabel(response.data.newLabel));
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };

  // Edit todo
  const editLabels = async (editForm) => {
    try {
      const response = await axios.put(`${Api_URL}/label/edit/${editForm._id}`, editForm);
      dispatch(editLabel(editForm));
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };

  // Delete todo
  const deleteLabels = async (labelId) => {
    try {
      const response = await axios.delete(`${Api_URL}/label/delete/${labelId}`);
      dispatch(deleteLabel(labelId));
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };

  // Search
  const searchLabels = async (searchValue) => {
    try {
      const response = await axios.get(`${Api_URL}/labels/search?name=${searchValue}`);
      dispatch(searchLabel(response.data.label));
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };

  //filter
  const filterTodos = async (label)=> {
    if(label === 'all') {
      await getAll();
    } else {
      try {
        const response = await axios.get(`${Api_URL}/todos/filter?label=${label}`);
        dispatch(filterTodo(response.data.todo));
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return error.response.data;
        } else {
          return {
            status: false,
            message: error.message,
          };
        }
      }
    }
  }

  //set 
  const setLabels = (labelId)=> {
    const label = labelState.labels.find((label)=>label._id === labelId);
    dispatch(setLabel(label));
  }

  const LabelsContextData = {
    showAddLabel,
    setShowAddLabel,
    showEditLabel,
    setShowEditLabel,
    showModalDelete,
    setShowModalDelete,
    id,
    setId,
    labelState,
    loading,
    setLoading,
    getAllLabels,
    createLabels,
    editLabels,
    deleteLabels,
    searchLabels,
    setLabels
  };

  return <LabelsContext.Provider value={LabelsContextData}>{children}</LabelsContext.Provider>;
};
