import {
  DeleteSetorRequest,
  DeleteSetorResponse,
  GetSetoresRequest,
  GetSetoresResponse,
  PatchSetorRequest,
  PatchSetorResponse,
  PostSetorRequest,
  PostSetorResponse,
  Setor,
} from "./models";
import { LoadingStateMachine, ReducerError } from "../models";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

type SetoresState = {
  data: Setor[];
  status: LoadingStateMachine;
  error: ReducerError;
};

export const setoresInitialState: SetoresState = {
  data: [],
  error: {
    data: {},
    message: "",
  },
  status: "idle",
};

export const getSetores = createAsyncThunk<
  GetSetoresResponse,
  GetSetoresRequest,
  {
    rejectValue: any;
  }
>("setores/getSetores", async (_request, thunkApi) => {
  try {
    const response = await axios.get("http://localhost:3001/setores");
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      data: error,
      message: "Erro ao buscar setores",
    });
  }
});

export const patchSetores = createAsyncThunk<
  PatchSetorResponse,
  PatchSetorRequest,
  {
    rejectValue: any;
  }
>("setores/patchSetores", async (request, thunkApi) => {
  try {
    const response = await axios.patch(
      `http://localhost:3001/setores/${request.params.id}`,
      request.payload
    );
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      data: error,
      message: "Erro ao carregar setores",
    });
  }
});

export const postSetores = createAsyncThunk<
  PostSetorResponse,
  PostSetorRequest,
  {
    rejectValue: any;
  }
>(
  "setores/postSetores",

  async ({ nome, cargos }: PostSetorRequest) => {
    const response = await axios.post("http://localhost:3001/setores", {
      nome,
      cargos,
    });
    return response.data;
  }
);

export const deleteSetores = createAsyncThunk<
  DeleteSetorResponse,
  DeleteSetorRequest,
  {
    rejectValue: any;
  }
>("setores/deleteSetores", async (request) => {
  const response = await axios.delete(
    `http://localhost:3001/setores/${request.id}`
  );
  return {
    id: request.id,
  };
});

export const setoresSlice = createSlice({
  name: "setores",
  initialState: setoresInitialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getSetores.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSetores.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(getSetores.rejected, (state, { payload }) => {
      state.status = "error";
      state.error = payload.error ?? state.error;
    });

    builder.addCase(patchSetores.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(patchSetores.fulfilled, (state, action) => {
      state.status = "success";
      state.data = state.data.map((setor) => {
        if (setor.id === action.payload.id) {
          return action.payload;
        }
        return setor;
      });
    });
    builder.addCase(patchSetores.rejected, (state, { payload }) => {
      state.status = "error";
      state.error = payload.error ?? state.error;
    });

    builder.addCase(postSetores.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postSetores.fulfilled, (state, action) => {
      state.status = "success";
      state.data = [...state.data, action.payload];
    });
    builder.addCase(postSetores.rejected, (state, { payload }) => {
      state.status = "error";
      state.error = payload.error ?? state.error;
    });

    builder.addCase(deleteSetores.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteSetores.fulfilled, (state, action) => {
      state.status = "success";
      state.data = state.data.filter((setor) => setor.id !== action.payload.id);
    });
    builder.addCase(deleteSetores.rejected, (state, { payload }) => {
      state.status = "error";
      state.error = payload.error ?? state.error;
    });
  },
});

export default setoresSlice.reducer;
