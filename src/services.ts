// MyComponent.tsx
import React, { useEffect, useState } from 'react';
import api from './api';

interface A_AIUserTask {
    id: number;
    userStoryId: number;
    name?: string | null;
    description?: string | null;
    estimate?: number | null;
    updateTime?: string | null;
    updateUserId?: number | null;
    isDelete: boolean;
    documentId?: string | null;
  }
  
  interface A_AITestCase {
    id: number;
    name?: string | null;
    description?: string | null;
    estimate?: number | null;
    updateTime?: string | null;
    updateUserId?: number | null;
    isDelete: boolean;
    userStoryId: number;
    documentId?: string | null;
  }
  
  interface UserStory {
    id: number;
    name?: string | null;
    description?: string | null;
    acceptanceCriteria?: string | null;
    updateTime?: string | null;
    updateUserId?: number | null;
    isDelete: boolean;
    sprintId?: number | null;
    documentId?: string | null;
    userTasks?: A_AIUserTask[] | null;
    testCases?: A_AITestCase[] | null;
  }

export const getAllUserStories = async () => {
    try {
        return await api.get<UserStory[]>('/A_AIUserStory/GetAll');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

export const createUserStory = async () => {
  try {
      return await api.get<UserStory[]>('/A_AIUserStory/Create');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const updateUserStory = async () => {
  try {
      return await api.get<UserStory[]>('/A_AIUserStory/Update');
  } catch (error) {
    console.error('Error create data:', error);
  }
};

export const chatUserStory = async () => {
  try {
      return await api.get<UserStory[]>('/A_AIUserStory/Chat');
  } catch (error) {
    console.error('Error chat data:', error);
  }
};

export const generateUserStory = async () => {
  try {
      return await api.post('/A_AIUserStory/Generate');
  } catch (error) {
    console.error('Error generate data:', error);
  }
};