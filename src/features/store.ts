import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./reducers/testSlice";
import subjectReducer from "./reducers/subjectSlice";
import topicReducer from "./reducers/topicSlice";
import subTopicReducer from "./reducers/subTopicSlice";
import getTestReducer from "./reducers/getTestSlice";

export const store = configureStore({
  reducer: {
    tests: testReducer,
    subject: subjectReducer,
    topics: topicReducer,
    subTopics: subTopicReducer,
    getTest: getTestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;