declare module 'better-sqlite3' {
  interface Statement {
    run(...params: any[]): any;
    get(...params: any[]): any;
    all(...params: any[]): any[];
  }

  interface Database {
    prepare(sql: string): Statement;
    exec(sql: string): void;
    close(): void;
  }

  interface DatabaseConstructor {
    new(path: string, options?: any): Database;
    (path: string, options?: any): Database;
  }

  const BetterSQLite3: DatabaseConstructor;
  export = BetterSQLite3;
} 