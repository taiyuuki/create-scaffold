declare const createProject: <T extends {
    output: string;
}>(templateFolder: string, options: T) => void;

export { createProject };
