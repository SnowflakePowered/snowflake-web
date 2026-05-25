/* tslint:disable */
/* eslint-disable */

/**
 * Entry point invoked from JS. The canvas element ID is passed in so the demo
 * can attach its WebGPU surface to it.
 */
export function run(canvas_id: string): Promise<void>;

export function start(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly run: (a: number, b: number) => any;
    readonly start: () => void;
    readonly wasm_bindgen_17213a80230ac5ee___convert__closures_____invoke___wasm_bindgen_17213a80230ac5ee___JsValue__core_c0933739ca4b745e___result__Result_____wasm_bindgen_17213a80230ac5ee___JsError___true_: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen_17213a80230ac5ee___convert__closures_____invoke___js_sys_1b9fb5f2c42351f4___Function_fn_wasm_bindgen_17213a80230ac5ee___JsValue_____wasm_bindgen_17213a80230ac5ee___sys__Undefined___js_sys_1b9fb5f2c42351f4___Function_fn_wasm_bindgen_17213a80230ac5ee___JsValue_____wasm_bindgen_17213a80230ac5ee___sys__Undefined_______true_: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen_17213a80230ac5ee___convert__closures_____invoke___wasm_bindgen_17213a80230ac5ee___JsValue______true_: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_17213a80230ac5ee___convert__closures_____invoke_______true_: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_destroy_closure: (a: number, b: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
