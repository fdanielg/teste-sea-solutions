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

import { AppState } from "../store";
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

export const patchSetor = createAsyncThunk<
  PatchSetorResponse,
  PatchSetorRequest,
  {
    rejectValue: any;
  }
>("setores/patchSetor", async (request, thunkApi) => {
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

export const postSetor = createAsyncThunk<
  PostSetorResponse,
  PostSetorRequest,
  {
    rejectValue: any;
  }
>(
  "setores/postSetor",

  async ({ nome, cargos }: PostSetorRequest) => {
    const response = await axios.post("http://localhost:3001/setores", {
      nome,
      cargos,
    });
    return response.data;
  }
);

export const deleteSetor = createAsyncThunk<
  DeleteSetorResponse,
  DeleteSetorRequest,
  {
    rejectValue: any;
  }
>("setores/deleteSetor", async (request) => {
  await axios.delete(
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

    builder.addCase(patchSetor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(patchSetor.fulfilled, (state, action) => {
      state.status = "success";
      state.data = state.data.map((setor) => {
        if (setor.id === action.payload.id) {
          return action.payload;
        }
        return setor;
      });
    });
    builder.addCase(patchSetor.rejected, (state, { payload }) => {
      state.status = "error";
      state.error = payload.error ?? state.error;
    });

    builder.addCase(postSetor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postSetor.fulfilled, (state, action) => {
      state.status = "success";
      state.data = [...state.data, action.payload];
    });
    builder.addCase(postSetor.rejected, (state, { payload }) => {
      state.status = "error";
      state.error = payload.error ?? state.error;
    });

    builder.addCase(deleteSetor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteSetor.fulfilled, (state, action) => {
      state.status = "success";
      state.data = state.data.filter((setor) => setor.id !== action.payload.id);
    });
    builder.addCase(deleteSetor.rejected, (state, { payload }) => {
      state.status = "error";
      state.error = payload.error ?? state.error;
    });
  },
});

export const selectCargoExiste =
  (nome: string) =>
  (state: AppState): boolean =>
    state.setores.data.some((setor) =>
      setor.cargos.some((cargo) => cargo.nome === nome)
    );

export const selectSetorExiste =
  (nome: string) =>
  (state: AppState): boolean =>
    state.setores.data.some((setor) => setor.nome === nome);

export default setoresSlice.reducer;
