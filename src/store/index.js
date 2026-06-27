import { configureStore } from '@reduxjs/toolkit';
import authReducer         from './slices/authSlice';
import dashboardReducer    from './slices/dashboardSlice';
import procurementReducer  from './slices/procurementSlice';
import vendorReducer       from './slices/vendorSlice';
import riskReducer         from './slices/riskSlice';
import complianceReducer   from './slices/complianceSlice';
import auditReducer        from './slices/auditSlice';
import reportReducer       from './slices/reportSlice';
import notificationReducer from './slices/notificationSlice';
import uiReducer           from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth:         authReducer,
    dashboard:    dashboardReducer,
    procurement:  procurementReducer,
    vendor:       vendorReducer,
    risk:         riskReducer,
    compliance:   complianceReducer,
    audit:        auditReducer,
    report:       reportReducer,
    notification: notificationReducer,
    ui:           uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;