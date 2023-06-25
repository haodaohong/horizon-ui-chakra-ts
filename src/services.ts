// MyComponent.tsx
import React, { useEffect, useState } from 'react';
import api from './api';

interface UserTask {
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

  interface TestCase {
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

export interface UserStory {
    id: number;
    name?: string | null;
    description?: string | null;
    acceptanceCriteria?: string | null;
    updateTime?: string | null;
    updateUserId?: number | null;
    isDelete: boolean;
    sprintId?: number | null;
    documentId?: string | null;
    userTasks?: UserTask[] | null;
    testCases?: TestCase[] | null;
  }

export const getAllUserStories = async () => {
    try {
        return await api.get<UserStory[]>('/A_AIUserStory/GetAll');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

export const createUserStory = async (data:string) => {
  try {
      return await api.post<UserStory>('/A_AIUserStory/Create',data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const updateUserStory = async (storyId:number,data:string) => {
  try {
      return await api.post<UserStory>('/A_AIUserStory/UpdateById?storyId='+storyId,data);
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

export const createUserTask = async (userStoryId:string, data:string) => {
  try {
      return await api.post<UserTask>(`/A_AIUserTask/Create?userStoryId=${userStoryId}`,data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const createTestCase = async (userStoryId:string, data:string) => {
  try {
      return await api.post<TestCase>(`/A_AITestCase/Create?userStoryId=${userStoryId}`,data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const updateUserTask = async (storyId:number,data:string) => {
  try {
      return await api.post<UserTask>('/A_AIUserTask/UpdateById?storyId='+storyId,data);
  } catch (error) {
    console.error('Error create data:', error);
  }
};

export const updateTestCase = async (storyId:number,data:string) => {
  try {
      return await api.post<TestCase>('/A_AITestCase/UpdateById?storyId='+storyId,data);
  } catch (error) {
    console.error('Error create data:', error);
  }
};

export const deleteUserStory = async (id:number) => {
  try {
      return await api.get(`/A_AIUserStory/Delete?id=${id}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};