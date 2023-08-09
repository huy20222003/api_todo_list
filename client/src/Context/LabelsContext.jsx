import { useReducer, useState, createContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { initLabelState, reducer } from '../Reducer/LabelsReducer/reducer';
import { Api_URL } from '../constant';
import {
  getAll,
  createLabel,
  editLabel,
  deleteLabel,
  searchLabel,
  setLabel,
} from '../Reducer/LabelsReducer/action';

export const LabelsContext = createContext();

export const LabelsProvider = ({ children }) => {
  const [showAddLabel, setShowAddLabel] = useState(false);
  const [showEditLabel, setShowEditLabel] = useState(false);
  const [labelState, dispatch] = useReducer(reducer, initLabelState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const getAllLabels = useCallback(async () => {
    try {
      const response = await axios.get(`${Api_URL}/label/all`);
      if (response.data.success) {
        dispatch(getAll(response.data.data));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  useEffect(() => {
    getAllLabels();
  }, []);

  // Create
  const createLabels = useCallback(
    async (LabelData) => {
      try {
        const response = await axios.post(`${Api_URL}/label/create`, LabelData);
        dispatch(createLabel(response.data.data));
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);

  // Edit todo
  const editLabels = useCallback(
    async (editForm) => {
      try {
        const response = await axios.put(
          `${Api_URL}/label/edit/${editForm._id}`,
          editForm
        );
        dispatch(editLabel(editForm));
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);

  // Delete todo
  const deleteLabels = useCallback(
    async (labelId) => {
      try {
        const response = await axios.delete(`${Api_URL}/label/delete/${labelId}`);
        dispatch(deleteLabel(labelId));
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);

  // Search
  const searchLabels = useCallback(
    async (searchValue) => {
      try {
        const response = await axios.get(
          `${Api_URL}/label/search?name=${searchValue}`
        );
        dispatch(searchLabel(response.data.data));
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    }, []);

  //filter
  const filterTodos = useCallback(
    async (label) => {
      if (label === 'all') {
        await getAll();
      } else {
        try {
          const response = await axios.get(
            `${Api_URL}/todos/filter?label=${label}`
          );
          dispatch(filterTodo(response.data.data));
          return response.data;
        } catch (error) {
          return handleError(error);
        }
      }
    }, []);

  //set
  const setLabels = useCallback(
    (labelId) => {
      const label = labelState.labels.find((label) => label._id === labelId);
      dispatch(setLabel(label));
    }, [labelState.labels]);

  const LabelsContextData = {
    showAddLabel,
    setShowAddLabel,
    showEditLabel,
    setShowEditLabel,
    labelState,
    getAllLabels,
    createLabels,
    editLabels,
    deleteLabels,
    searchLabels,
    setLabels,
  };

  return (
    <LabelsContext.Provider value={LabelsContextData}>
      {children}
    </LabelsContext.Provider>
  );
};
