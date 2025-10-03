
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model KhoaHoc
 * 
 */
export type KhoaHoc = $Result.DefaultSelection<Prisma.$KhoaHocPayload>
/**
 * Model BaiHoc
 * 
 */
export type BaiHoc = $Result.DefaultSelection<Prisma.$BaiHocPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model UserRole
 * 
 */
export type UserRole = $Result.DefaultSelection<Prisma.$UserRolePayload>
/**
 * Model RoleClaim
 * 
 */
export type RoleClaim = $Result.DefaultSelection<Prisma.$RoleClaimPayload>
/**
 * Model CT_NguoiDung_KhoaHoc
 * 
 */
export type CT_NguoiDung_KhoaHoc = $Result.DefaultSelection<Prisma.$CT_NguoiDung_KhoaHocPayload>
/**
 * Model CT_NguoiDung_BaiHoc
 * 
 */
export type CT_NguoiDung_BaiHoc = $Result.DefaultSelection<Prisma.$CT_NguoiDung_BaiHocPayload>
/**
 * Model CauHoiGame
 * 
 */
export type CauHoiGame = $Result.DefaultSelection<Prisma.$CauHoiGamePayload>
/**
 * Model LichSuChoiGame
 * 
 */
export type LichSuChoiGame = $Result.DefaultSelection<Prisma.$LichSuChoiGamePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more KhoaHocs
 * const khoaHocs = await prisma.khoaHoc.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more KhoaHocs
   * const khoaHocs = await prisma.khoaHoc.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.khoaHoc`: Exposes CRUD operations for the **KhoaHoc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KhoaHocs
    * const khoaHocs = await prisma.khoaHoc.findMany()
    * ```
    */
  get khoaHoc(): Prisma.KhoaHocDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.baiHoc`: Exposes CRUD operations for the **BaiHoc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BaiHocs
    * const baiHocs = await prisma.baiHoc.findMany()
    * ```
    */
  get baiHoc(): Prisma.BaiHocDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoles
    * const userRoles = await prisma.userRole.findMany()
    * ```
    */
  get userRole(): Prisma.UserRoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roleClaim`: Exposes CRUD operations for the **RoleClaim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoleClaims
    * const roleClaims = await prisma.roleClaim.findMany()
    * ```
    */
  get roleClaim(): Prisma.RoleClaimDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cT_NguoiDung_KhoaHoc`: Exposes CRUD operations for the **CT_NguoiDung_KhoaHoc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CT_NguoiDung_KhoaHocs
    * const cT_NguoiDung_KhoaHocs = await prisma.cT_NguoiDung_KhoaHoc.findMany()
    * ```
    */
  get cT_NguoiDung_KhoaHoc(): Prisma.CT_NguoiDung_KhoaHocDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cT_NguoiDung_BaiHoc`: Exposes CRUD operations for the **CT_NguoiDung_BaiHoc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CT_NguoiDung_BaiHocs
    * const cT_NguoiDung_BaiHocs = await prisma.cT_NguoiDung_BaiHoc.findMany()
    * ```
    */
  get cT_NguoiDung_BaiHoc(): Prisma.CT_NguoiDung_BaiHocDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cauHoiGame`: Exposes CRUD operations for the **CauHoiGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CauHoiGames
    * const cauHoiGames = await prisma.cauHoiGame.findMany()
    * ```
    */
  get cauHoiGame(): Prisma.CauHoiGameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lichSuChoiGame`: Exposes CRUD operations for the **LichSuChoiGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LichSuChoiGames
    * const lichSuChoiGames = await prisma.lichSuChoiGame.findMany()
    * ```
    */
  get lichSuChoiGame(): Prisma.LichSuChoiGameDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.1
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    KhoaHoc: 'KhoaHoc',
    BaiHoc: 'BaiHoc',
    User: 'User',
    Role: 'Role',
    UserRole: 'UserRole',
    RoleClaim: 'RoleClaim',
    CT_NguoiDung_KhoaHoc: 'CT_NguoiDung_KhoaHoc',
    CT_NguoiDung_BaiHoc: 'CT_NguoiDung_BaiHoc',
    CauHoiGame: 'CauHoiGame',
    LichSuChoiGame: 'LichSuChoiGame'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "khoaHoc" | "baiHoc" | "user" | "role" | "userRole" | "roleClaim" | "cT_NguoiDung_KhoaHoc" | "cT_NguoiDung_BaiHoc" | "cauHoiGame" | "lichSuChoiGame"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      KhoaHoc: {
        payload: Prisma.$KhoaHocPayload<ExtArgs>
        fields: Prisma.KhoaHocFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KhoaHocFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KhoaHocFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload>
          }
          findFirst: {
            args: Prisma.KhoaHocFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KhoaHocFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload>
          }
          findMany: {
            args: Prisma.KhoaHocFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload>[]
          }
          create: {
            args: Prisma.KhoaHocCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload>
          }
          createMany: {
            args: Prisma.KhoaHocCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KhoaHocCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload>[]
          }
          delete: {
            args: Prisma.KhoaHocDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload>
          }
          update: {
            args: Prisma.KhoaHocUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload>
          }
          deleteMany: {
            args: Prisma.KhoaHocDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KhoaHocUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KhoaHocUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload>[]
          }
          upsert: {
            args: Prisma.KhoaHocUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KhoaHocPayload>
          }
          aggregate: {
            args: Prisma.KhoaHocAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKhoaHoc>
          }
          groupBy: {
            args: Prisma.KhoaHocGroupByArgs<ExtArgs>
            result: $Utils.Optional<KhoaHocGroupByOutputType>[]
          }
          count: {
            args: Prisma.KhoaHocCountArgs<ExtArgs>
            result: $Utils.Optional<KhoaHocCountAggregateOutputType> | number
          }
        }
      }
      BaiHoc: {
        payload: Prisma.$BaiHocPayload<ExtArgs>
        fields: Prisma.BaiHocFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BaiHocFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BaiHocFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload>
          }
          findFirst: {
            args: Prisma.BaiHocFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BaiHocFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload>
          }
          findMany: {
            args: Prisma.BaiHocFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload>[]
          }
          create: {
            args: Prisma.BaiHocCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload>
          }
          createMany: {
            args: Prisma.BaiHocCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BaiHocCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload>[]
          }
          delete: {
            args: Prisma.BaiHocDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload>
          }
          update: {
            args: Prisma.BaiHocUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload>
          }
          deleteMany: {
            args: Prisma.BaiHocDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BaiHocUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BaiHocUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload>[]
          }
          upsert: {
            args: Prisma.BaiHocUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BaiHocPayload>
          }
          aggregate: {
            args: Prisma.BaiHocAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBaiHoc>
          }
          groupBy: {
            args: Prisma.BaiHocGroupByArgs<ExtArgs>
            result: $Utils.Optional<BaiHocGroupByOutputType>[]
          }
          count: {
            args: Prisma.BaiHocCountArgs<ExtArgs>
            result: $Utils.Optional<BaiHocCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      UserRole: {
        payload: Prisma.$UserRolePayload<ExtArgs>
        fields: Prisma.UserRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findFirst: {
            args: Prisma.UserRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findMany: {
            args: Prisma.UserRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          create: {
            args: Prisma.UserRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          createMany: {
            args: Prisma.UserRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          delete: {
            args: Prisma.UserRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          update: {
            args: Prisma.UserRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          deleteMany: {
            args: Prisma.UserRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserRoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          upsert: {
            args: Prisma.UserRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          aggregate: {
            args: Prisma.UserRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRole>
          }
          groupBy: {
            args: Prisma.UserRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRoleCountArgs<ExtArgs>
            result: $Utils.Optional<UserRoleCountAggregateOutputType> | number
          }
        }
      }
      RoleClaim: {
        payload: Prisma.$RoleClaimPayload<ExtArgs>
        fields: Prisma.RoleClaimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleClaimFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleClaimFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload>
          }
          findFirst: {
            args: Prisma.RoleClaimFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleClaimFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload>
          }
          findMany: {
            args: Prisma.RoleClaimFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload>[]
          }
          create: {
            args: Prisma.RoleClaimCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload>
          }
          createMany: {
            args: Prisma.RoleClaimCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleClaimCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload>[]
          }
          delete: {
            args: Prisma.RoleClaimDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload>
          }
          update: {
            args: Prisma.RoleClaimUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload>
          }
          deleteMany: {
            args: Prisma.RoleClaimDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleClaimUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleClaimUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload>[]
          }
          upsert: {
            args: Prisma.RoleClaimUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleClaimPayload>
          }
          aggregate: {
            args: Prisma.RoleClaimAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoleClaim>
          }
          groupBy: {
            args: Prisma.RoleClaimGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleClaimGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleClaimCountArgs<ExtArgs>
            result: $Utils.Optional<RoleClaimCountAggregateOutputType> | number
          }
        }
      }
      CT_NguoiDung_KhoaHoc: {
        payload: Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>
        fields: Prisma.CT_NguoiDung_KhoaHocFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CT_NguoiDung_KhoaHocFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CT_NguoiDung_KhoaHocFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload>
          }
          findFirst: {
            args: Prisma.CT_NguoiDung_KhoaHocFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CT_NguoiDung_KhoaHocFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload>
          }
          findMany: {
            args: Prisma.CT_NguoiDung_KhoaHocFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload>[]
          }
          create: {
            args: Prisma.CT_NguoiDung_KhoaHocCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload>
          }
          createMany: {
            args: Prisma.CT_NguoiDung_KhoaHocCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CT_NguoiDung_KhoaHocCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload>[]
          }
          delete: {
            args: Prisma.CT_NguoiDung_KhoaHocDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload>
          }
          update: {
            args: Prisma.CT_NguoiDung_KhoaHocUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload>
          }
          deleteMany: {
            args: Prisma.CT_NguoiDung_KhoaHocDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CT_NguoiDung_KhoaHocUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CT_NguoiDung_KhoaHocUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload>[]
          }
          upsert: {
            args: Prisma.CT_NguoiDung_KhoaHocUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_KhoaHocPayload>
          }
          aggregate: {
            args: Prisma.CT_NguoiDung_KhoaHocAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCT_NguoiDung_KhoaHoc>
          }
          groupBy: {
            args: Prisma.CT_NguoiDung_KhoaHocGroupByArgs<ExtArgs>
            result: $Utils.Optional<CT_NguoiDung_KhoaHocGroupByOutputType>[]
          }
          count: {
            args: Prisma.CT_NguoiDung_KhoaHocCountArgs<ExtArgs>
            result: $Utils.Optional<CT_NguoiDung_KhoaHocCountAggregateOutputType> | number
          }
        }
      }
      CT_NguoiDung_BaiHoc: {
        payload: Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>
        fields: Prisma.CT_NguoiDung_BaiHocFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CT_NguoiDung_BaiHocFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CT_NguoiDung_BaiHocFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload>
          }
          findFirst: {
            args: Prisma.CT_NguoiDung_BaiHocFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CT_NguoiDung_BaiHocFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload>
          }
          findMany: {
            args: Prisma.CT_NguoiDung_BaiHocFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload>[]
          }
          create: {
            args: Prisma.CT_NguoiDung_BaiHocCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload>
          }
          createMany: {
            args: Prisma.CT_NguoiDung_BaiHocCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CT_NguoiDung_BaiHocCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload>[]
          }
          delete: {
            args: Prisma.CT_NguoiDung_BaiHocDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload>
          }
          update: {
            args: Prisma.CT_NguoiDung_BaiHocUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload>
          }
          deleteMany: {
            args: Prisma.CT_NguoiDung_BaiHocDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CT_NguoiDung_BaiHocUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CT_NguoiDung_BaiHocUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload>[]
          }
          upsert: {
            args: Prisma.CT_NguoiDung_BaiHocUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CT_NguoiDung_BaiHocPayload>
          }
          aggregate: {
            args: Prisma.CT_NguoiDung_BaiHocAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCT_NguoiDung_BaiHoc>
          }
          groupBy: {
            args: Prisma.CT_NguoiDung_BaiHocGroupByArgs<ExtArgs>
            result: $Utils.Optional<CT_NguoiDung_BaiHocGroupByOutputType>[]
          }
          count: {
            args: Prisma.CT_NguoiDung_BaiHocCountArgs<ExtArgs>
            result: $Utils.Optional<CT_NguoiDung_BaiHocCountAggregateOutputType> | number
          }
        }
      }
      CauHoiGame: {
        payload: Prisma.$CauHoiGamePayload<ExtArgs>
        fields: Prisma.CauHoiGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CauHoiGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CauHoiGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload>
          }
          findFirst: {
            args: Prisma.CauHoiGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CauHoiGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload>
          }
          findMany: {
            args: Prisma.CauHoiGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload>[]
          }
          create: {
            args: Prisma.CauHoiGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload>
          }
          createMany: {
            args: Prisma.CauHoiGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CauHoiGameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload>[]
          }
          delete: {
            args: Prisma.CauHoiGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload>
          }
          update: {
            args: Prisma.CauHoiGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload>
          }
          deleteMany: {
            args: Prisma.CauHoiGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CauHoiGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CauHoiGameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload>[]
          }
          upsert: {
            args: Prisma.CauHoiGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CauHoiGamePayload>
          }
          aggregate: {
            args: Prisma.CauHoiGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCauHoiGame>
          }
          groupBy: {
            args: Prisma.CauHoiGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<CauHoiGameGroupByOutputType>[]
          }
          count: {
            args: Prisma.CauHoiGameCountArgs<ExtArgs>
            result: $Utils.Optional<CauHoiGameCountAggregateOutputType> | number
          }
        }
      }
      LichSuChoiGame: {
        payload: Prisma.$LichSuChoiGamePayload<ExtArgs>
        fields: Prisma.LichSuChoiGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LichSuChoiGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LichSuChoiGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload>
          }
          findFirst: {
            args: Prisma.LichSuChoiGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LichSuChoiGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload>
          }
          findMany: {
            args: Prisma.LichSuChoiGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload>[]
          }
          create: {
            args: Prisma.LichSuChoiGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload>
          }
          createMany: {
            args: Prisma.LichSuChoiGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LichSuChoiGameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload>[]
          }
          delete: {
            args: Prisma.LichSuChoiGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload>
          }
          update: {
            args: Prisma.LichSuChoiGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload>
          }
          deleteMany: {
            args: Prisma.LichSuChoiGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LichSuChoiGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LichSuChoiGameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload>[]
          }
          upsert: {
            args: Prisma.LichSuChoiGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LichSuChoiGamePayload>
          }
          aggregate: {
            args: Prisma.LichSuChoiGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLichSuChoiGame>
          }
          groupBy: {
            args: Prisma.LichSuChoiGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<LichSuChoiGameGroupByOutputType>[]
          }
          count: {
            args: Prisma.LichSuChoiGameCountArgs<ExtArgs>
            result: $Utils.Optional<LichSuChoiGameCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    khoaHoc?: KhoaHocOmit
    baiHoc?: BaiHocOmit
    user?: UserOmit
    role?: RoleOmit
    userRole?: UserRoleOmit
    roleClaim?: RoleClaimOmit
    cT_NguoiDung_KhoaHoc?: CT_NguoiDung_KhoaHocOmit
    cT_NguoiDung_BaiHoc?: CT_NguoiDung_BaiHocOmit
    cauHoiGame?: CauHoiGameOmit
    lichSuChoiGame?: LichSuChoiGameOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type KhoaHocCountOutputType
   */

  export type KhoaHocCountOutputType = {
    baiHocs: number
    CT_NguoiDung_KhoaHocs: number
  }

  export type KhoaHocCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baiHocs?: boolean | KhoaHocCountOutputTypeCountBaiHocsArgs
    CT_NguoiDung_KhoaHocs?: boolean | KhoaHocCountOutputTypeCountCT_NguoiDung_KhoaHocsArgs
  }

  // Custom InputTypes
  /**
   * KhoaHocCountOutputType without action
   */
  export type KhoaHocCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHocCountOutputType
     */
    select?: KhoaHocCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KhoaHocCountOutputType without action
   */
  export type KhoaHocCountOutputTypeCountBaiHocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BaiHocWhereInput
  }

  /**
   * KhoaHocCountOutputType without action
   */
  export type KhoaHocCountOutputTypeCountCT_NguoiDung_KhoaHocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CT_NguoiDung_KhoaHocWhereInput
  }


  /**
   * Count Type BaiHocCountOutputType
   */

  export type BaiHocCountOutputType = {
    CT_NguoiDung_BaiHocs: number
  }

  export type BaiHocCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    CT_NguoiDung_BaiHocs?: boolean | BaiHocCountOutputTypeCountCT_NguoiDung_BaiHocsArgs
  }

  // Custom InputTypes
  /**
   * BaiHocCountOutputType without action
   */
  export type BaiHocCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHocCountOutputType
     */
    select?: BaiHocCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BaiHocCountOutputType without action
   */
  export type BaiHocCountOutputTypeCountCT_NguoiDung_BaiHocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CT_NguoiDung_BaiHocWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    roles: number
    CT_NguoiDung_KhoaHocs: number
    CT_NguoiDung_BaiHocs: number
    lichSuChoiGames: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | UserCountOutputTypeCountRolesArgs
    CT_NguoiDung_KhoaHocs?: boolean | UserCountOutputTypeCountCT_NguoiDung_KhoaHocsArgs
    CT_NguoiDung_BaiHocs?: boolean | UserCountOutputTypeCountCT_NguoiDung_BaiHocsArgs
    lichSuChoiGames?: boolean | UserCountOutputTypeCountLichSuChoiGamesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCT_NguoiDung_KhoaHocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CT_NguoiDung_KhoaHocWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCT_NguoiDung_BaiHocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CT_NguoiDung_BaiHocWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLichSuChoiGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LichSuChoiGameWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    claims: number
    users: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | RoleCountOutputTypeCountClaimsArgs
    users?: boolean | RoleCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleClaimWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
  }


  /**
   * Count Type CauHoiGameCountOutputType
   */

  export type CauHoiGameCountOutputType = {
    lichSuChoiGames: number
  }

  export type CauHoiGameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lichSuChoiGames?: boolean | CauHoiGameCountOutputTypeCountLichSuChoiGamesArgs
  }

  // Custom InputTypes
  /**
   * CauHoiGameCountOutputType without action
   */
  export type CauHoiGameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGameCountOutputType
     */
    select?: CauHoiGameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CauHoiGameCountOutputType without action
   */
  export type CauHoiGameCountOutputTypeCountLichSuChoiGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LichSuChoiGameWhereInput
  }


  /**
   * Models
   */

  /**
   * Model KhoaHoc
   */

  export type AggregateKhoaHoc = {
    _count: KhoaHocCountAggregateOutputType | null
    _avg: KhoaHocAvgAggregateOutputType | null
    _sum: KhoaHocSumAggregateOutputType | null
    _min: KhoaHocMinAggregateOutputType | null
    _max: KhoaHocMaxAggregateOutputType | null
  }

  export type KhoaHocAvgAggregateOutputType = {
    KhoaHocId: number | null
    Gia: number | null
  }

  export type KhoaHocSumAggregateOutputType = {
    KhoaHocId: number | null
    Gia: number | null
  }

  export type KhoaHocMinAggregateOutputType = {
    KhoaHocId: number | null
    TenKhoaHoc: string | null
    MoTa: string | null
    Gia: number | null
    VideoUrl: string | null
    HinhAnh: string | null
  }

  export type KhoaHocMaxAggregateOutputType = {
    KhoaHocId: number | null
    TenKhoaHoc: string | null
    MoTa: string | null
    Gia: number | null
    VideoUrl: string | null
    HinhAnh: string | null
  }

  export type KhoaHocCountAggregateOutputType = {
    KhoaHocId: number
    TenKhoaHoc: number
    MoTa: number
    Gia: number
    VideoUrl: number
    HinhAnh: number
    _all: number
  }


  export type KhoaHocAvgAggregateInputType = {
    KhoaHocId?: true
    Gia?: true
  }

  export type KhoaHocSumAggregateInputType = {
    KhoaHocId?: true
    Gia?: true
  }

  export type KhoaHocMinAggregateInputType = {
    KhoaHocId?: true
    TenKhoaHoc?: true
    MoTa?: true
    Gia?: true
    VideoUrl?: true
    HinhAnh?: true
  }

  export type KhoaHocMaxAggregateInputType = {
    KhoaHocId?: true
    TenKhoaHoc?: true
    MoTa?: true
    Gia?: true
    VideoUrl?: true
    HinhAnh?: true
  }

  export type KhoaHocCountAggregateInputType = {
    KhoaHocId?: true
    TenKhoaHoc?: true
    MoTa?: true
    Gia?: true
    VideoUrl?: true
    HinhAnh?: true
    _all?: true
  }

  export type KhoaHocAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KhoaHoc to aggregate.
     */
    where?: KhoaHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KhoaHocs to fetch.
     */
    orderBy?: KhoaHocOrderByWithRelationInput | KhoaHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KhoaHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KhoaHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KhoaHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KhoaHocs
    **/
    _count?: true | KhoaHocCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KhoaHocAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KhoaHocSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KhoaHocMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KhoaHocMaxAggregateInputType
  }

  export type GetKhoaHocAggregateType<T extends KhoaHocAggregateArgs> = {
        [P in keyof T & keyof AggregateKhoaHoc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKhoaHoc[P]>
      : GetScalarType<T[P], AggregateKhoaHoc[P]>
  }




  export type KhoaHocGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KhoaHocWhereInput
    orderBy?: KhoaHocOrderByWithAggregationInput | KhoaHocOrderByWithAggregationInput[]
    by: KhoaHocScalarFieldEnum[] | KhoaHocScalarFieldEnum
    having?: KhoaHocScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KhoaHocCountAggregateInputType | true
    _avg?: KhoaHocAvgAggregateInputType
    _sum?: KhoaHocSumAggregateInputType
    _min?: KhoaHocMinAggregateInputType
    _max?: KhoaHocMaxAggregateInputType
  }

  export type KhoaHocGroupByOutputType = {
    KhoaHocId: number
    TenKhoaHoc: string
    MoTa: string | null
    Gia: number
    VideoUrl: string | null
    HinhAnh: string | null
    _count: KhoaHocCountAggregateOutputType | null
    _avg: KhoaHocAvgAggregateOutputType | null
    _sum: KhoaHocSumAggregateOutputType | null
    _min: KhoaHocMinAggregateOutputType | null
    _max: KhoaHocMaxAggregateOutputType | null
  }

  type GetKhoaHocGroupByPayload<T extends KhoaHocGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KhoaHocGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KhoaHocGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KhoaHocGroupByOutputType[P]>
            : GetScalarType<T[P], KhoaHocGroupByOutputType[P]>
        }
      >
    >


  export type KhoaHocSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    KhoaHocId?: boolean
    TenKhoaHoc?: boolean
    MoTa?: boolean
    Gia?: boolean
    VideoUrl?: boolean
    HinhAnh?: boolean
    baiHocs?: boolean | KhoaHoc$baiHocsArgs<ExtArgs>
    CT_NguoiDung_KhoaHocs?: boolean | KhoaHoc$CT_NguoiDung_KhoaHocsArgs<ExtArgs>
    _count?: boolean | KhoaHocCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["khoaHoc"]>

  export type KhoaHocSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    KhoaHocId?: boolean
    TenKhoaHoc?: boolean
    MoTa?: boolean
    Gia?: boolean
    VideoUrl?: boolean
    HinhAnh?: boolean
  }, ExtArgs["result"]["khoaHoc"]>

  export type KhoaHocSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    KhoaHocId?: boolean
    TenKhoaHoc?: boolean
    MoTa?: boolean
    Gia?: boolean
    VideoUrl?: boolean
    HinhAnh?: boolean
  }, ExtArgs["result"]["khoaHoc"]>

  export type KhoaHocSelectScalar = {
    KhoaHocId?: boolean
    TenKhoaHoc?: boolean
    MoTa?: boolean
    Gia?: boolean
    VideoUrl?: boolean
    HinhAnh?: boolean
  }

  export type KhoaHocOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"KhoaHocId" | "TenKhoaHoc" | "MoTa" | "Gia" | "VideoUrl" | "HinhAnh", ExtArgs["result"]["khoaHoc"]>
  export type KhoaHocInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baiHocs?: boolean | KhoaHoc$baiHocsArgs<ExtArgs>
    CT_NguoiDung_KhoaHocs?: boolean | KhoaHoc$CT_NguoiDung_KhoaHocsArgs<ExtArgs>
    _count?: boolean | KhoaHocCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KhoaHocIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type KhoaHocIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $KhoaHocPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KhoaHoc"
    objects: {
      baiHocs: Prisma.$BaiHocPayload<ExtArgs>[]
      CT_NguoiDung_KhoaHocs: Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      KhoaHocId: number
      TenKhoaHoc: string
      MoTa: string | null
      Gia: number
      VideoUrl: string | null
      HinhAnh: string | null
    }, ExtArgs["result"]["khoaHoc"]>
    composites: {}
  }

  type KhoaHocGetPayload<S extends boolean | null | undefined | KhoaHocDefaultArgs> = $Result.GetResult<Prisma.$KhoaHocPayload, S>

  type KhoaHocCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KhoaHocFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KhoaHocCountAggregateInputType | true
    }

  export interface KhoaHocDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KhoaHoc'], meta: { name: 'KhoaHoc' } }
    /**
     * Find zero or one KhoaHoc that matches the filter.
     * @param {KhoaHocFindUniqueArgs} args - Arguments to find a KhoaHoc
     * @example
     * // Get one KhoaHoc
     * const khoaHoc = await prisma.khoaHoc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KhoaHocFindUniqueArgs>(args: SelectSubset<T, KhoaHocFindUniqueArgs<ExtArgs>>): Prisma__KhoaHocClient<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KhoaHoc that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KhoaHocFindUniqueOrThrowArgs} args - Arguments to find a KhoaHoc
     * @example
     * // Get one KhoaHoc
     * const khoaHoc = await prisma.khoaHoc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KhoaHocFindUniqueOrThrowArgs>(args: SelectSubset<T, KhoaHocFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KhoaHocClient<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KhoaHoc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KhoaHocFindFirstArgs} args - Arguments to find a KhoaHoc
     * @example
     * // Get one KhoaHoc
     * const khoaHoc = await prisma.khoaHoc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KhoaHocFindFirstArgs>(args?: SelectSubset<T, KhoaHocFindFirstArgs<ExtArgs>>): Prisma__KhoaHocClient<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KhoaHoc that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KhoaHocFindFirstOrThrowArgs} args - Arguments to find a KhoaHoc
     * @example
     * // Get one KhoaHoc
     * const khoaHoc = await prisma.khoaHoc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KhoaHocFindFirstOrThrowArgs>(args?: SelectSubset<T, KhoaHocFindFirstOrThrowArgs<ExtArgs>>): Prisma__KhoaHocClient<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KhoaHocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KhoaHocFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KhoaHocs
     * const khoaHocs = await prisma.khoaHoc.findMany()
     * 
     * // Get first 10 KhoaHocs
     * const khoaHocs = await prisma.khoaHoc.findMany({ take: 10 })
     * 
     * // Only select the `KhoaHocId`
     * const khoaHocWithKhoaHocIdOnly = await prisma.khoaHoc.findMany({ select: { KhoaHocId: true } })
     * 
     */
    findMany<T extends KhoaHocFindManyArgs>(args?: SelectSubset<T, KhoaHocFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KhoaHoc.
     * @param {KhoaHocCreateArgs} args - Arguments to create a KhoaHoc.
     * @example
     * // Create one KhoaHoc
     * const KhoaHoc = await prisma.khoaHoc.create({
     *   data: {
     *     // ... data to create a KhoaHoc
     *   }
     * })
     * 
     */
    create<T extends KhoaHocCreateArgs>(args: SelectSubset<T, KhoaHocCreateArgs<ExtArgs>>): Prisma__KhoaHocClient<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KhoaHocs.
     * @param {KhoaHocCreateManyArgs} args - Arguments to create many KhoaHocs.
     * @example
     * // Create many KhoaHocs
     * const khoaHoc = await prisma.khoaHoc.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KhoaHocCreateManyArgs>(args?: SelectSubset<T, KhoaHocCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KhoaHocs and returns the data saved in the database.
     * @param {KhoaHocCreateManyAndReturnArgs} args - Arguments to create many KhoaHocs.
     * @example
     * // Create many KhoaHocs
     * const khoaHoc = await prisma.khoaHoc.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KhoaHocs and only return the `KhoaHocId`
     * const khoaHocWithKhoaHocIdOnly = await prisma.khoaHoc.createManyAndReturn({
     *   select: { KhoaHocId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KhoaHocCreateManyAndReturnArgs>(args?: SelectSubset<T, KhoaHocCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KhoaHoc.
     * @param {KhoaHocDeleteArgs} args - Arguments to delete one KhoaHoc.
     * @example
     * // Delete one KhoaHoc
     * const KhoaHoc = await prisma.khoaHoc.delete({
     *   where: {
     *     // ... filter to delete one KhoaHoc
     *   }
     * })
     * 
     */
    delete<T extends KhoaHocDeleteArgs>(args: SelectSubset<T, KhoaHocDeleteArgs<ExtArgs>>): Prisma__KhoaHocClient<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KhoaHoc.
     * @param {KhoaHocUpdateArgs} args - Arguments to update one KhoaHoc.
     * @example
     * // Update one KhoaHoc
     * const khoaHoc = await prisma.khoaHoc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KhoaHocUpdateArgs>(args: SelectSubset<T, KhoaHocUpdateArgs<ExtArgs>>): Prisma__KhoaHocClient<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KhoaHocs.
     * @param {KhoaHocDeleteManyArgs} args - Arguments to filter KhoaHocs to delete.
     * @example
     * // Delete a few KhoaHocs
     * const { count } = await prisma.khoaHoc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KhoaHocDeleteManyArgs>(args?: SelectSubset<T, KhoaHocDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KhoaHocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KhoaHocUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KhoaHocs
     * const khoaHoc = await prisma.khoaHoc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KhoaHocUpdateManyArgs>(args: SelectSubset<T, KhoaHocUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KhoaHocs and returns the data updated in the database.
     * @param {KhoaHocUpdateManyAndReturnArgs} args - Arguments to update many KhoaHocs.
     * @example
     * // Update many KhoaHocs
     * const khoaHoc = await prisma.khoaHoc.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KhoaHocs and only return the `KhoaHocId`
     * const khoaHocWithKhoaHocIdOnly = await prisma.khoaHoc.updateManyAndReturn({
     *   select: { KhoaHocId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KhoaHocUpdateManyAndReturnArgs>(args: SelectSubset<T, KhoaHocUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KhoaHoc.
     * @param {KhoaHocUpsertArgs} args - Arguments to update or create a KhoaHoc.
     * @example
     * // Update or create a KhoaHoc
     * const khoaHoc = await prisma.khoaHoc.upsert({
     *   create: {
     *     // ... data to create a KhoaHoc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KhoaHoc we want to update
     *   }
     * })
     */
    upsert<T extends KhoaHocUpsertArgs>(args: SelectSubset<T, KhoaHocUpsertArgs<ExtArgs>>): Prisma__KhoaHocClient<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KhoaHocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KhoaHocCountArgs} args - Arguments to filter KhoaHocs to count.
     * @example
     * // Count the number of KhoaHocs
     * const count = await prisma.khoaHoc.count({
     *   where: {
     *     // ... the filter for the KhoaHocs we want to count
     *   }
     * })
    **/
    count<T extends KhoaHocCountArgs>(
      args?: Subset<T, KhoaHocCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KhoaHocCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KhoaHoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KhoaHocAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KhoaHocAggregateArgs>(args: Subset<T, KhoaHocAggregateArgs>): Prisma.PrismaPromise<GetKhoaHocAggregateType<T>>

    /**
     * Group by KhoaHoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KhoaHocGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KhoaHocGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KhoaHocGroupByArgs['orderBy'] }
        : { orderBy?: KhoaHocGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KhoaHocGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKhoaHocGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KhoaHoc model
   */
  readonly fields: KhoaHocFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KhoaHoc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KhoaHocClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    baiHocs<T extends KhoaHoc$baiHocsArgs<ExtArgs> = {}>(args?: Subset<T, KhoaHoc$baiHocsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    CT_NguoiDung_KhoaHocs<T extends KhoaHoc$CT_NguoiDung_KhoaHocsArgs<ExtArgs> = {}>(args?: Subset<T, KhoaHoc$CT_NguoiDung_KhoaHocsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KhoaHoc model
   */
  interface KhoaHocFieldRefs {
    readonly KhoaHocId: FieldRef<"KhoaHoc", 'Int'>
    readonly TenKhoaHoc: FieldRef<"KhoaHoc", 'String'>
    readonly MoTa: FieldRef<"KhoaHoc", 'String'>
    readonly Gia: FieldRef<"KhoaHoc", 'Float'>
    readonly VideoUrl: FieldRef<"KhoaHoc", 'String'>
    readonly HinhAnh: FieldRef<"KhoaHoc", 'String'>
  }
    

  // Custom InputTypes
  /**
   * KhoaHoc findUnique
   */
  export type KhoaHocFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KhoaHocInclude<ExtArgs> | null
    /**
     * Filter, which KhoaHoc to fetch.
     */
    where: KhoaHocWhereUniqueInput
  }

  /**
   * KhoaHoc findUniqueOrThrow
   */
  export type KhoaHocFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KhoaHocInclude<ExtArgs> | null
    /**
     * Filter, which KhoaHoc to fetch.
     */
    where: KhoaHocWhereUniqueInput
  }

  /**
   * KhoaHoc findFirst
   */
  export type KhoaHocFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KhoaHocInclude<ExtArgs> | null
    /**
     * Filter, which KhoaHoc to fetch.
     */
    where?: KhoaHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KhoaHocs to fetch.
     */
    orderBy?: KhoaHocOrderByWithRelationInput | KhoaHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KhoaHocs.
     */
    cursor?: KhoaHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KhoaHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KhoaHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KhoaHocs.
     */
    distinct?: KhoaHocScalarFieldEnum | KhoaHocScalarFieldEnum[]
  }

  /**
   * KhoaHoc findFirstOrThrow
   */
  export type KhoaHocFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KhoaHocInclude<ExtArgs> | null
    /**
     * Filter, which KhoaHoc to fetch.
     */
    where?: KhoaHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KhoaHocs to fetch.
     */
    orderBy?: KhoaHocOrderByWithRelationInput | KhoaHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KhoaHocs.
     */
    cursor?: KhoaHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KhoaHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KhoaHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KhoaHocs.
     */
    distinct?: KhoaHocScalarFieldEnum | KhoaHocScalarFieldEnum[]
  }

  /**
   * KhoaHoc findMany
   */
  export type KhoaHocFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KhoaHocInclude<ExtArgs> | null
    /**
     * Filter, which KhoaHocs to fetch.
     */
    where?: KhoaHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KhoaHocs to fetch.
     */
    orderBy?: KhoaHocOrderByWithRelationInput | KhoaHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KhoaHocs.
     */
    cursor?: KhoaHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KhoaHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KhoaHocs.
     */
    skip?: number
    distinct?: KhoaHocScalarFieldEnum | KhoaHocScalarFieldEnum[]
  }

  /**
   * KhoaHoc create
   */
  export type KhoaHocCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KhoaHocInclude<ExtArgs> | null
    /**
     * The data needed to create a KhoaHoc.
     */
    data: XOR<KhoaHocCreateInput, KhoaHocUncheckedCreateInput>
  }

  /**
   * KhoaHoc createMany
   */
  export type KhoaHocCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KhoaHocs.
     */
    data: KhoaHocCreateManyInput | KhoaHocCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KhoaHoc createManyAndReturn
   */
  export type KhoaHocCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * The data used to create many KhoaHocs.
     */
    data: KhoaHocCreateManyInput | KhoaHocCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KhoaHoc update
   */
  export type KhoaHocUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KhoaHocInclude<ExtArgs> | null
    /**
     * The data needed to update a KhoaHoc.
     */
    data: XOR<KhoaHocUpdateInput, KhoaHocUncheckedUpdateInput>
    /**
     * Choose, which KhoaHoc to update.
     */
    where: KhoaHocWhereUniqueInput
  }

  /**
   * KhoaHoc updateMany
   */
  export type KhoaHocUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KhoaHocs.
     */
    data: XOR<KhoaHocUpdateManyMutationInput, KhoaHocUncheckedUpdateManyInput>
    /**
     * Filter which KhoaHocs to update
     */
    where?: KhoaHocWhereInput
    /**
     * Limit how many KhoaHocs to update.
     */
    limit?: number
  }

  /**
   * KhoaHoc updateManyAndReturn
   */
  export type KhoaHocUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * The data used to update KhoaHocs.
     */
    data: XOR<KhoaHocUpdateManyMutationInput, KhoaHocUncheckedUpdateManyInput>
    /**
     * Filter which KhoaHocs to update
     */
    where?: KhoaHocWhereInput
    /**
     * Limit how many KhoaHocs to update.
     */
    limit?: number
  }

  /**
   * KhoaHoc upsert
   */
  export type KhoaHocUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KhoaHocInclude<ExtArgs> | null
    /**
     * The filter to search for the KhoaHoc to update in case it exists.
     */
    where: KhoaHocWhereUniqueInput
    /**
     * In case the KhoaHoc found by the `where` argument doesn't exist, create a new KhoaHoc with this data.
     */
    create: XOR<KhoaHocCreateInput, KhoaHocUncheckedCreateInput>
    /**
     * In case the KhoaHoc was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KhoaHocUpdateInput, KhoaHocUncheckedUpdateInput>
  }

  /**
   * KhoaHoc delete
   */
  export type KhoaHocDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KhoaHocInclude<ExtArgs> | null
    /**
     * Filter which KhoaHoc to delete.
     */
    where: KhoaHocWhereUniqueInput
  }

  /**
   * KhoaHoc deleteMany
   */
  export type KhoaHocDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KhoaHocs to delete
     */
    where?: KhoaHocWhereInput
    /**
     * Limit how many KhoaHocs to delete.
     */
    limit?: number
  }

  /**
   * KhoaHoc.baiHocs
   */
  export type KhoaHoc$baiHocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
    where?: BaiHocWhereInput
    orderBy?: BaiHocOrderByWithRelationInput | BaiHocOrderByWithRelationInput[]
    cursor?: BaiHocWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BaiHocScalarFieldEnum | BaiHocScalarFieldEnum[]
  }

  /**
   * KhoaHoc.CT_NguoiDung_KhoaHocs
   */
  export type KhoaHoc$CT_NguoiDung_KhoaHocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    where?: CT_NguoiDung_KhoaHocWhereInput
    orderBy?: CT_NguoiDung_KhoaHocOrderByWithRelationInput | CT_NguoiDung_KhoaHocOrderByWithRelationInput[]
    cursor?: CT_NguoiDung_KhoaHocWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CT_NguoiDung_KhoaHocScalarFieldEnum | CT_NguoiDung_KhoaHocScalarFieldEnum[]
  }

  /**
   * KhoaHoc without action
   */
  export type KhoaHocDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KhoaHoc
     */
    select?: KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KhoaHoc
     */
    omit?: KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KhoaHocInclude<ExtArgs> | null
  }


  /**
   * Model BaiHoc
   */

  export type AggregateBaiHoc = {
    _count: BaiHocCountAggregateOutputType | null
    _avg: BaiHocAvgAggregateOutputType | null
    _sum: BaiHocSumAggregateOutputType | null
    _min: BaiHocMinAggregateOutputType | null
    _max: BaiHocMaxAggregateOutputType | null
  }

  export type BaiHocAvgAggregateOutputType = {
    BaiHocId: number | null
    KhoaHocId: number | null
  }

  export type BaiHocSumAggregateOutputType = {
    BaiHocId: number | null
    KhoaHocId: number | null
  }

  export type BaiHocMinAggregateOutputType = {
    BaiHocId: number | null
    TieuDe: string | null
    NoiDung: string | null
    VideoUrl: string | null
    HinhAnh: string | null
    KhoaHocId: number | null
  }

  export type BaiHocMaxAggregateOutputType = {
    BaiHocId: number | null
    TieuDe: string | null
    NoiDung: string | null
    VideoUrl: string | null
    HinhAnh: string | null
    KhoaHocId: number | null
  }

  export type BaiHocCountAggregateOutputType = {
    BaiHocId: number
    TieuDe: number
    NoiDung: number
    VideoUrl: number
    HinhAnh: number
    KhoaHocId: number
    _all: number
  }


  export type BaiHocAvgAggregateInputType = {
    BaiHocId?: true
    KhoaHocId?: true
  }

  export type BaiHocSumAggregateInputType = {
    BaiHocId?: true
    KhoaHocId?: true
  }

  export type BaiHocMinAggregateInputType = {
    BaiHocId?: true
    TieuDe?: true
    NoiDung?: true
    VideoUrl?: true
    HinhAnh?: true
    KhoaHocId?: true
  }

  export type BaiHocMaxAggregateInputType = {
    BaiHocId?: true
    TieuDe?: true
    NoiDung?: true
    VideoUrl?: true
    HinhAnh?: true
    KhoaHocId?: true
  }

  export type BaiHocCountAggregateInputType = {
    BaiHocId?: true
    TieuDe?: true
    NoiDung?: true
    VideoUrl?: true
    HinhAnh?: true
    KhoaHocId?: true
    _all?: true
  }

  export type BaiHocAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BaiHoc to aggregate.
     */
    where?: BaiHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BaiHocs to fetch.
     */
    orderBy?: BaiHocOrderByWithRelationInput | BaiHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BaiHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BaiHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BaiHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BaiHocs
    **/
    _count?: true | BaiHocCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BaiHocAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BaiHocSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BaiHocMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BaiHocMaxAggregateInputType
  }

  export type GetBaiHocAggregateType<T extends BaiHocAggregateArgs> = {
        [P in keyof T & keyof AggregateBaiHoc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBaiHoc[P]>
      : GetScalarType<T[P], AggregateBaiHoc[P]>
  }




  export type BaiHocGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BaiHocWhereInput
    orderBy?: BaiHocOrderByWithAggregationInput | BaiHocOrderByWithAggregationInput[]
    by: BaiHocScalarFieldEnum[] | BaiHocScalarFieldEnum
    having?: BaiHocScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BaiHocCountAggregateInputType | true
    _avg?: BaiHocAvgAggregateInputType
    _sum?: BaiHocSumAggregateInputType
    _min?: BaiHocMinAggregateInputType
    _max?: BaiHocMaxAggregateInputType
  }

  export type BaiHocGroupByOutputType = {
    BaiHocId: number
    TieuDe: string
    NoiDung: string | null
    VideoUrl: string | null
    HinhAnh: string | null
    KhoaHocId: number
    _count: BaiHocCountAggregateOutputType | null
    _avg: BaiHocAvgAggregateOutputType | null
    _sum: BaiHocSumAggregateOutputType | null
    _min: BaiHocMinAggregateOutputType | null
    _max: BaiHocMaxAggregateOutputType | null
  }

  type GetBaiHocGroupByPayload<T extends BaiHocGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BaiHocGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BaiHocGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BaiHocGroupByOutputType[P]>
            : GetScalarType<T[P], BaiHocGroupByOutputType[P]>
        }
      >
    >


  export type BaiHocSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    BaiHocId?: boolean
    TieuDe?: boolean
    NoiDung?: boolean
    VideoUrl?: boolean
    HinhAnh?: boolean
    KhoaHocId?: boolean
    KhoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
    CT_NguoiDung_BaiHocs?: boolean | BaiHoc$CT_NguoiDung_BaiHocsArgs<ExtArgs>
    _count?: boolean | BaiHocCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["baiHoc"]>

  export type BaiHocSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    BaiHocId?: boolean
    TieuDe?: boolean
    NoiDung?: boolean
    VideoUrl?: boolean
    HinhAnh?: boolean
    KhoaHocId?: boolean
    KhoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["baiHoc"]>

  export type BaiHocSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    BaiHocId?: boolean
    TieuDe?: boolean
    NoiDung?: boolean
    VideoUrl?: boolean
    HinhAnh?: boolean
    KhoaHocId?: boolean
    KhoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["baiHoc"]>

  export type BaiHocSelectScalar = {
    BaiHocId?: boolean
    TieuDe?: boolean
    NoiDung?: boolean
    VideoUrl?: boolean
    HinhAnh?: boolean
    KhoaHocId?: boolean
  }

  export type BaiHocOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"BaiHocId" | "TieuDe" | "NoiDung" | "VideoUrl" | "HinhAnh" | "KhoaHocId", ExtArgs["result"]["baiHoc"]>
  export type BaiHocInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    KhoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
    CT_NguoiDung_BaiHocs?: boolean | BaiHoc$CT_NguoiDung_BaiHocsArgs<ExtArgs>
    _count?: boolean | BaiHocCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BaiHocIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    KhoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
  }
  export type BaiHocIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    KhoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
  }

  export type $BaiHocPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BaiHoc"
    objects: {
      KhoaHoc: Prisma.$KhoaHocPayload<ExtArgs>
      CT_NguoiDung_BaiHocs: Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      BaiHocId: number
      TieuDe: string
      NoiDung: string | null
      VideoUrl: string | null
      HinhAnh: string | null
      KhoaHocId: number
    }, ExtArgs["result"]["baiHoc"]>
    composites: {}
  }

  type BaiHocGetPayload<S extends boolean | null | undefined | BaiHocDefaultArgs> = $Result.GetResult<Prisma.$BaiHocPayload, S>

  type BaiHocCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BaiHocFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BaiHocCountAggregateInputType | true
    }

  export interface BaiHocDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BaiHoc'], meta: { name: 'BaiHoc' } }
    /**
     * Find zero or one BaiHoc that matches the filter.
     * @param {BaiHocFindUniqueArgs} args - Arguments to find a BaiHoc
     * @example
     * // Get one BaiHoc
     * const baiHoc = await prisma.baiHoc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BaiHocFindUniqueArgs>(args: SelectSubset<T, BaiHocFindUniqueArgs<ExtArgs>>): Prisma__BaiHocClient<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BaiHoc that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BaiHocFindUniqueOrThrowArgs} args - Arguments to find a BaiHoc
     * @example
     * // Get one BaiHoc
     * const baiHoc = await prisma.baiHoc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BaiHocFindUniqueOrThrowArgs>(args: SelectSubset<T, BaiHocFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BaiHocClient<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BaiHoc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaiHocFindFirstArgs} args - Arguments to find a BaiHoc
     * @example
     * // Get one BaiHoc
     * const baiHoc = await prisma.baiHoc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BaiHocFindFirstArgs>(args?: SelectSubset<T, BaiHocFindFirstArgs<ExtArgs>>): Prisma__BaiHocClient<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BaiHoc that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaiHocFindFirstOrThrowArgs} args - Arguments to find a BaiHoc
     * @example
     * // Get one BaiHoc
     * const baiHoc = await prisma.baiHoc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BaiHocFindFirstOrThrowArgs>(args?: SelectSubset<T, BaiHocFindFirstOrThrowArgs<ExtArgs>>): Prisma__BaiHocClient<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BaiHocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaiHocFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BaiHocs
     * const baiHocs = await prisma.baiHoc.findMany()
     * 
     * // Get first 10 BaiHocs
     * const baiHocs = await prisma.baiHoc.findMany({ take: 10 })
     * 
     * // Only select the `BaiHocId`
     * const baiHocWithBaiHocIdOnly = await prisma.baiHoc.findMany({ select: { BaiHocId: true } })
     * 
     */
    findMany<T extends BaiHocFindManyArgs>(args?: SelectSubset<T, BaiHocFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BaiHoc.
     * @param {BaiHocCreateArgs} args - Arguments to create a BaiHoc.
     * @example
     * // Create one BaiHoc
     * const BaiHoc = await prisma.baiHoc.create({
     *   data: {
     *     // ... data to create a BaiHoc
     *   }
     * })
     * 
     */
    create<T extends BaiHocCreateArgs>(args: SelectSubset<T, BaiHocCreateArgs<ExtArgs>>): Prisma__BaiHocClient<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BaiHocs.
     * @param {BaiHocCreateManyArgs} args - Arguments to create many BaiHocs.
     * @example
     * // Create many BaiHocs
     * const baiHoc = await prisma.baiHoc.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BaiHocCreateManyArgs>(args?: SelectSubset<T, BaiHocCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BaiHocs and returns the data saved in the database.
     * @param {BaiHocCreateManyAndReturnArgs} args - Arguments to create many BaiHocs.
     * @example
     * // Create many BaiHocs
     * const baiHoc = await prisma.baiHoc.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BaiHocs and only return the `BaiHocId`
     * const baiHocWithBaiHocIdOnly = await prisma.baiHoc.createManyAndReturn({
     *   select: { BaiHocId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BaiHocCreateManyAndReturnArgs>(args?: SelectSubset<T, BaiHocCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BaiHoc.
     * @param {BaiHocDeleteArgs} args - Arguments to delete one BaiHoc.
     * @example
     * // Delete one BaiHoc
     * const BaiHoc = await prisma.baiHoc.delete({
     *   where: {
     *     // ... filter to delete one BaiHoc
     *   }
     * })
     * 
     */
    delete<T extends BaiHocDeleteArgs>(args: SelectSubset<T, BaiHocDeleteArgs<ExtArgs>>): Prisma__BaiHocClient<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BaiHoc.
     * @param {BaiHocUpdateArgs} args - Arguments to update one BaiHoc.
     * @example
     * // Update one BaiHoc
     * const baiHoc = await prisma.baiHoc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BaiHocUpdateArgs>(args: SelectSubset<T, BaiHocUpdateArgs<ExtArgs>>): Prisma__BaiHocClient<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BaiHocs.
     * @param {BaiHocDeleteManyArgs} args - Arguments to filter BaiHocs to delete.
     * @example
     * // Delete a few BaiHocs
     * const { count } = await prisma.baiHoc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BaiHocDeleteManyArgs>(args?: SelectSubset<T, BaiHocDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BaiHocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaiHocUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BaiHocs
     * const baiHoc = await prisma.baiHoc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BaiHocUpdateManyArgs>(args: SelectSubset<T, BaiHocUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BaiHocs and returns the data updated in the database.
     * @param {BaiHocUpdateManyAndReturnArgs} args - Arguments to update many BaiHocs.
     * @example
     * // Update many BaiHocs
     * const baiHoc = await prisma.baiHoc.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BaiHocs and only return the `BaiHocId`
     * const baiHocWithBaiHocIdOnly = await prisma.baiHoc.updateManyAndReturn({
     *   select: { BaiHocId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BaiHocUpdateManyAndReturnArgs>(args: SelectSubset<T, BaiHocUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BaiHoc.
     * @param {BaiHocUpsertArgs} args - Arguments to update or create a BaiHoc.
     * @example
     * // Update or create a BaiHoc
     * const baiHoc = await prisma.baiHoc.upsert({
     *   create: {
     *     // ... data to create a BaiHoc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BaiHoc we want to update
     *   }
     * })
     */
    upsert<T extends BaiHocUpsertArgs>(args: SelectSubset<T, BaiHocUpsertArgs<ExtArgs>>): Prisma__BaiHocClient<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BaiHocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaiHocCountArgs} args - Arguments to filter BaiHocs to count.
     * @example
     * // Count the number of BaiHocs
     * const count = await prisma.baiHoc.count({
     *   where: {
     *     // ... the filter for the BaiHocs we want to count
     *   }
     * })
    **/
    count<T extends BaiHocCountArgs>(
      args?: Subset<T, BaiHocCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BaiHocCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BaiHoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaiHocAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BaiHocAggregateArgs>(args: Subset<T, BaiHocAggregateArgs>): Prisma.PrismaPromise<GetBaiHocAggregateType<T>>

    /**
     * Group by BaiHoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BaiHocGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BaiHocGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BaiHocGroupByArgs['orderBy'] }
        : { orderBy?: BaiHocGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BaiHocGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBaiHocGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BaiHoc model
   */
  readonly fields: BaiHocFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BaiHoc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BaiHocClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    KhoaHoc<T extends KhoaHocDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KhoaHocDefaultArgs<ExtArgs>>): Prisma__KhoaHocClient<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    CT_NguoiDung_BaiHocs<T extends BaiHoc$CT_NguoiDung_BaiHocsArgs<ExtArgs> = {}>(args?: Subset<T, BaiHoc$CT_NguoiDung_BaiHocsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BaiHoc model
   */
  interface BaiHocFieldRefs {
    readonly BaiHocId: FieldRef<"BaiHoc", 'Int'>
    readonly TieuDe: FieldRef<"BaiHoc", 'String'>
    readonly NoiDung: FieldRef<"BaiHoc", 'String'>
    readonly VideoUrl: FieldRef<"BaiHoc", 'String'>
    readonly HinhAnh: FieldRef<"BaiHoc", 'String'>
    readonly KhoaHocId: FieldRef<"BaiHoc", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BaiHoc findUnique
   */
  export type BaiHocFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
    /**
     * Filter, which BaiHoc to fetch.
     */
    where: BaiHocWhereUniqueInput
  }

  /**
   * BaiHoc findUniqueOrThrow
   */
  export type BaiHocFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
    /**
     * Filter, which BaiHoc to fetch.
     */
    where: BaiHocWhereUniqueInput
  }

  /**
   * BaiHoc findFirst
   */
  export type BaiHocFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
    /**
     * Filter, which BaiHoc to fetch.
     */
    where?: BaiHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BaiHocs to fetch.
     */
    orderBy?: BaiHocOrderByWithRelationInput | BaiHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BaiHocs.
     */
    cursor?: BaiHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BaiHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BaiHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BaiHocs.
     */
    distinct?: BaiHocScalarFieldEnum | BaiHocScalarFieldEnum[]
  }

  /**
   * BaiHoc findFirstOrThrow
   */
  export type BaiHocFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
    /**
     * Filter, which BaiHoc to fetch.
     */
    where?: BaiHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BaiHocs to fetch.
     */
    orderBy?: BaiHocOrderByWithRelationInput | BaiHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BaiHocs.
     */
    cursor?: BaiHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BaiHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BaiHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BaiHocs.
     */
    distinct?: BaiHocScalarFieldEnum | BaiHocScalarFieldEnum[]
  }

  /**
   * BaiHoc findMany
   */
  export type BaiHocFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
    /**
     * Filter, which BaiHocs to fetch.
     */
    where?: BaiHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BaiHocs to fetch.
     */
    orderBy?: BaiHocOrderByWithRelationInput | BaiHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BaiHocs.
     */
    cursor?: BaiHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BaiHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BaiHocs.
     */
    skip?: number
    distinct?: BaiHocScalarFieldEnum | BaiHocScalarFieldEnum[]
  }

  /**
   * BaiHoc create
   */
  export type BaiHocCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
    /**
     * The data needed to create a BaiHoc.
     */
    data: XOR<BaiHocCreateInput, BaiHocUncheckedCreateInput>
  }

  /**
   * BaiHoc createMany
   */
  export type BaiHocCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BaiHocs.
     */
    data: BaiHocCreateManyInput | BaiHocCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BaiHoc createManyAndReturn
   */
  export type BaiHocCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * The data used to create many BaiHocs.
     */
    data: BaiHocCreateManyInput | BaiHocCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BaiHoc update
   */
  export type BaiHocUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
    /**
     * The data needed to update a BaiHoc.
     */
    data: XOR<BaiHocUpdateInput, BaiHocUncheckedUpdateInput>
    /**
     * Choose, which BaiHoc to update.
     */
    where: BaiHocWhereUniqueInput
  }

  /**
   * BaiHoc updateMany
   */
  export type BaiHocUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BaiHocs.
     */
    data: XOR<BaiHocUpdateManyMutationInput, BaiHocUncheckedUpdateManyInput>
    /**
     * Filter which BaiHocs to update
     */
    where?: BaiHocWhereInput
    /**
     * Limit how many BaiHocs to update.
     */
    limit?: number
  }

  /**
   * BaiHoc updateManyAndReturn
   */
  export type BaiHocUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * The data used to update BaiHocs.
     */
    data: XOR<BaiHocUpdateManyMutationInput, BaiHocUncheckedUpdateManyInput>
    /**
     * Filter which BaiHocs to update
     */
    where?: BaiHocWhereInput
    /**
     * Limit how many BaiHocs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BaiHoc upsert
   */
  export type BaiHocUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
    /**
     * The filter to search for the BaiHoc to update in case it exists.
     */
    where: BaiHocWhereUniqueInput
    /**
     * In case the BaiHoc found by the `where` argument doesn't exist, create a new BaiHoc with this data.
     */
    create: XOR<BaiHocCreateInput, BaiHocUncheckedCreateInput>
    /**
     * In case the BaiHoc was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BaiHocUpdateInput, BaiHocUncheckedUpdateInput>
  }

  /**
   * BaiHoc delete
   */
  export type BaiHocDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
    /**
     * Filter which BaiHoc to delete.
     */
    where: BaiHocWhereUniqueInput
  }

  /**
   * BaiHoc deleteMany
   */
  export type BaiHocDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BaiHocs to delete
     */
    where?: BaiHocWhereInput
    /**
     * Limit how many BaiHocs to delete.
     */
    limit?: number
  }

  /**
   * BaiHoc.CT_NguoiDung_BaiHocs
   */
  export type BaiHoc$CT_NguoiDung_BaiHocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    where?: CT_NguoiDung_BaiHocWhereInput
    orderBy?: CT_NguoiDung_BaiHocOrderByWithRelationInput | CT_NguoiDung_BaiHocOrderByWithRelationInput[]
    cursor?: CT_NguoiDung_BaiHocWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CT_NguoiDung_BaiHocScalarFieldEnum | CT_NguoiDung_BaiHocScalarFieldEnum[]
  }

  /**
   * BaiHoc without action
   */
  export type BaiHocDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BaiHoc
     */
    select?: BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BaiHoc
     */
    omit?: BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BaiHocInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    fullname: string | null
    sex: string | null
    phonenumber: string | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    fullname: string | null
    sex: string | null
    phonenumber: string | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    fullname: number
    sex: number
    phonenumber: number
    password: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    fullname?: true
    sex?: true
    phonenumber?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    fullname?: true
    sex?: true
    phonenumber?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    fullname?: true
    sex?: true
    phonenumber?: true
    password?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullname?: boolean
    sex?: boolean
    phonenumber?: boolean
    password?: boolean
    roles?: boolean | User$rolesArgs<ExtArgs>
    CT_NguoiDung_KhoaHocs?: boolean | User$CT_NguoiDung_KhoaHocsArgs<ExtArgs>
    CT_NguoiDung_BaiHocs?: boolean | User$CT_NguoiDung_BaiHocsArgs<ExtArgs>
    lichSuChoiGames?: boolean | User$lichSuChoiGamesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullname?: boolean
    sex?: boolean
    phonenumber?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullname?: boolean
    sex?: boolean
    phonenumber?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    fullname?: boolean
    sex?: boolean
    phonenumber?: boolean
    password?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "fullname" | "sex" | "phonenumber" | "password", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | User$rolesArgs<ExtArgs>
    CT_NguoiDung_KhoaHocs?: boolean | User$CT_NguoiDung_KhoaHocsArgs<ExtArgs>
    CT_NguoiDung_BaiHocs?: boolean | User$CT_NguoiDung_BaiHocsArgs<ExtArgs>
    lichSuChoiGames?: boolean | User$lichSuChoiGamesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      roles: Prisma.$UserRolePayload<ExtArgs>[]
      CT_NguoiDung_KhoaHocs: Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>[]
      CT_NguoiDung_BaiHocs: Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>[]
      lichSuChoiGames: Prisma.$LichSuChoiGamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      fullname: string
      sex: string
      phonenumber: string
      password: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends User$rolesArgs<ExtArgs> = {}>(args?: Subset<T, User$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    CT_NguoiDung_KhoaHocs<T extends User$CT_NguoiDung_KhoaHocsArgs<ExtArgs> = {}>(args?: Subset<T, User$CT_NguoiDung_KhoaHocsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    CT_NguoiDung_BaiHocs<T extends User$CT_NguoiDung_BaiHocsArgs<ExtArgs> = {}>(args?: Subset<T, User$CT_NguoiDung_BaiHocsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lichSuChoiGames<T extends User$lichSuChoiGamesArgs<ExtArgs> = {}>(args?: Subset<T, User$lichSuChoiGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly fullname: FieldRef<"User", 'String'>
    readonly sex: FieldRef<"User", 'String'>
    readonly phonenumber: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.roles
   */
  export type User$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * User.CT_NguoiDung_KhoaHocs
   */
  export type User$CT_NguoiDung_KhoaHocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    where?: CT_NguoiDung_KhoaHocWhereInput
    orderBy?: CT_NguoiDung_KhoaHocOrderByWithRelationInput | CT_NguoiDung_KhoaHocOrderByWithRelationInput[]
    cursor?: CT_NguoiDung_KhoaHocWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CT_NguoiDung_KhoaHocScalarFieldEnum | CT_NguoiDung_KhoaHocScalarFieldEnum[]
  }

  /**
   * User.CT_NguoiDung_BaiHocs
   */
  export type User$CT_NguoiDung_BaiHocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    where?: CT_NguoiDung_BaiHocWhereInput
    orderBy?: CT_NguoiDung_BaiHocOrderByWithRelationInput | CT_NguoiDung_BaiHocOrderByWithRelationInput[]
    cursor?: CT_NguoiDung_BaiHocWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CT_NguoiDung_BaiHocScalarFieldEnum | CT_NguoiDung_BaiHocScalarFieldEnum[]
  }

  /**
   * User.lichSuChoiGames
   */
  export type User$lichSuChoiGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    where?: LichSuChoiGameWhereInput
    orderBy?: LichSuChoiGameOrderByWithRelationInput | LichSuChoiGameOrderByWithRelationInput[]
    cursor?: LichSuChoiGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LichSuChoiGameScalarFieldEnum | LichSuChoiGameScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleAvgAggregateOutputType = {
    id: number | null
  }

  export type RoleSumAggregateOutputType = {
    id: number | null
  }

  export type RoleMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type RoleMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type RoleAvgAggregateInputType = {
    id?: true
  }

  export type RoleSumAggregateInputType = {
    id?: true
  }

  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _avg?: RoleAvgAggregateInputType
    _sum?: RoleSumAggregateInputType
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: number
    name: string
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    claims?: boolean | Role$claimsArgs<ExtArgs>
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | Role$claimsArgs<ExtArgs>
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      claims: Prisma.$RoleClaimPayload<ExtArgs>[]
      users: Prisma.$UserRolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    claims<T extends Role$claimsArgs<ExtArgs> = {}>(args?: Subset<T, Role$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'Int'>
    readonly name: FieldRef<"Role", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.claims
   */
  export type Role$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
    where?: RoleClaimWhereInput
    orderBy?: RoleClaimOrderByWithRelationInput | RoleClaimOrderByWithRelationInput[]
    cursor?: RoleClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleClaimScalarFieldEnum | RoleClaimScalarFieldEnum[]
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model UserRole
   */

  export type AggregateUserRole = {
    _count: UserRoleCountAggregateOutputType | null
    _avg: UserRoleAvgAggregateOutputType | null
    _sum: UserRoleSumAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  export type UserRoleAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    roleId: number | null
  }

  export type UserRoleSumAggregateOutputType = {
    id: number | null
    userId: number | null
    roleId: number | null
  }

  export type UserRoleMinAggregateOutputType = {
    id: number | null
    userId: number | null
    roleId: number | null
  }

  export type UserRoleMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    roleId: number | null
  }

  export type UserRoleCountAggregateOutputType = {
    id: number
    userId: number
    roleId: number
    _all: number
  }


  export type UserRoleAvgAggregateInputType = {
    id?: true
    userId?: true
    roleId?: true
  }

  export type UserRoleSumAggregateInputType = {
    id?: true
    userId?: true
    roleId?: true
  }

  export type UserRoleMinAggregateInputType = {
    id?: true
    userId?: true
    roleId?: true
  }

  export type UserRoleMaxAggregateInputType = {
    id?: true
    userId?: true
    roleId?: true
  }

  export type UserRoleCountAggregateInputType = {
    id?: true
    userId?: true
    roleId?: true
    _all?: true
  }

  export type UserRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRole to aggregate.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoles
    **/
    _count?: true | UserRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserRoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserRoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRoleMaxAggregateInputType
  }

  export type GetUserRoleAggregateType<T extends UserRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRole[P]>
      : GetScalarType<T[P], AggregateUserRole[P]>
  }




  export type UserRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithAggregationInput | UserRoleOrderByWithAggregationInput[]
    by: UserRoleScalarFieldEnum[] | UserRoleScalarFieldEnum
    having?: UserRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRoleCountAggregateInputType | true
    _avg?: UserRoleAvgAggregateInputType
    _sum?: UserRoleSumAggregateInputType
    _min?: UserRoleMinAggregateInputType
    _max?: UserRoleMaxAggregateInputType
  }

  export type UserRoleGroupByOutputType = {
    id: number
    userId: number
    roleId: number
    _count: UserRoleCountAggregateOutputType | null
    _avg: UserRoleAvgAggregateOutputType | null
    _sum: UserRoleSumAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  type GetUserRoleGroupByPayload<T extends UserRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
            : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
        }
      >
    >


  export type UserRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roleId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roleId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roleId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectScalar = {
    id?: boolean
    userId?: boolean
    roleId?: boolean
  }

  export type UserRoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "roleId", ExtArgs["result"]["userRole"]>
  export type UserRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserRoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $UserRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRole"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      role: Prisma.$RolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      roleId: number
    }, ExtArgs["result"]["userRole"]>
    composites: {}
  }

  type UserRoleGetPayload<S extends boolean | null | undefined | UserRoleDefaultArgs> = $Result.GetResult<Prisma.$UserRolePayload, S>

  type UserRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserRoleCountAggregateInputType | true
    }

  export interface UserRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRole'], meta: { name: 'UserRole' } }
    /**
     * Find zero or one UserRole that matches the filter.
     * @param {UserRoleFindUniqueArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRoleFindUniqueArgs>(args: SelectSubset<T, UserRoleFindUniqueArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRoleFindUniqueOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRoleFindFirstArgs>(args?: SelectSubset<T, UserRoleFindFirstArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoles
     * const userRoles = await prisma.userRole.findMany()
     * 
     * // Get first 10 UserRoles
     * const userRoles = await prisma.userRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRoleWithIdOnly = await prisma.userRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRoleFindManyArgs>(args?: SelectSubset<T, UserRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRole.
     * @param {UserRoleCreateArgs} args - Arguments to create a UserRole.
     * @example
     * // Create one UserRole
     * const UserRole = await prisma.userRole.create({
     *   data: {
     *     // ... data to create a UserRole
     *   }
     * })
     * 
     */
    create<T extends UserRoleCreateArgs>(args: SelectSubset<T, UserRoleCreateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRoles.
     * @param {UserRoleCreateManyArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRoleCreateManyArgs>(args?: SelectSubset<T, UserRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRoles and returns the data saved in the database.
     * @param {UserRoleCreateManyAndReturnArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRoles and only return the `id`
     * const userRoleWithIdOnly = await prisma.userRole.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserRole.
     * @param {UserRoleDeleteArgs} args - Arguments to delete one UserRole.
     * @example
     * // Delete one UserRole
     * const UserRole = await prisma.userRole.delete({
     *   where: {
     *     // ... filter to delete one UserRole
     *   }
     * })
     * 
     */
    delete<T extends UserRoleDeleteArgs>(args: SelectSubset<T, UserRoleDeleteArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRole.
     * @param {UserRoleUpdateArgs} args - Arguments to update one UserRole.
     * @example
     * // Update one UserRole
     * const userRole = await prisma.userRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRoleUpdateArgs>(args: SelectSubset<T, UserRoleUpdateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRoles.
     * @param {UserRoleDeleteManyArgs} args - Arguments to filter UserRoles to delete.
     * @example
     * // Delete a few UserRoles
     * const { count } = await prisma.userRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRoleDeleteManyArgs>(args?: SelectSubset<T, UserRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRoleUpdateManyArgs>(args: SelectSubset<T, UserRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles and returns the data updated in the database.
     * @param {UserRoleUpdateManyAndReturnArgs} args - Arguments to update many UserRoles.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserRoles and only return the `id`
     * const userRoleWithIdOnly = await prisma.userRole.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserRoleUpdateManyAndReturnArgs>(args: SelectSubset<T, UserRoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserRole.
     * @param {UserRoleUpsertArgs} args - Arguments to update or create a UserRole.
     * @example
     * // Update or create a UserRole
     * const userRole = await prisma.userRole.upsert({
     *   create: {
     *     // ... data to create a UserRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRole we want to update
     *   }
     * })
     */
    upsert<T extends UserRoleUpsertArgs>(args: SelectSubset<T, UserRoleUpsertArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleCountArgs} args - Arguments to filter UserRoles to count.
     * @example
     * // Count the number of UserRoles
     * const count = await prisma.userRole.count({
     *   where: {
     *     // ... the filter for the UserRoles we want to count
     *   }
     * })
    **/
    count<T extends UserRoleCountArgs>(
      args?: Subset<T, UserRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserRoleAggregateArgs>(args: Subset<T, UserRoleAggregateArgs>): Prisma.PrismaPromise<GetUserRoleAggregateType<T>>

    /**
     * Group by UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRoleGroupByArgs['orderBy'] }
        : { orderBy?: UserRoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRole model
   */
  readonly fields: UserRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserRole model
   */
  interface UserRoleFieldRefs {
    readonly id: FieldRef<"UserRole", 'Int'>
    readonly userId: FieldRef<"UserRole", 'Int'>
    readonly roleId: FieldRef<"UserRole", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserRole findUnique
   */
  export type UserRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findUniqueOrThrow
   */
  export type UserRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findFirst
   */
  export type UserRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole findFirstOrThrow
   */
  export type UserRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole findMany
   */
  export type UserRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole create
   */
  export type UserRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRole.
     */
    data: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
  }

  /**
   * UserRole createMany
   */
  export type UserRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserRole createManyAndReturn
   */
  export type UserRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRole update
   */
  export type UserRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRole.
     */
    data: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
    /**
     * Choose, which UserRole to update.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole updateMany
   */
  export type UserRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number
  }

  /**
   * UserRole updateManyAndReturn
   */
  export type UserRoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRole upsert
   */
  export type UserRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRole to update in case it exists.
     */
    where: UserRoleWhereUniqueInput
    /**
     * In case the UserRole found by the `where` argument doesn't exist, create a new UserRole with this data.
     */
    create: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
    /**
     * In case the UserRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
  }

  /**
   * UserRole delete
   */
  export type UserRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter which UserRole to delete.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole deleteMany
   */
  export type UserRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoles to delete
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to delete.
     */
    limit?: number
  }

  /**
   * UserRole without action
   */
  export type UserRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
  }


  /**
   * Model RoleClaim
   */

  export type AggregateRoleClaim = {
    _count: RoleClaimCountAggregateOutputType | null
    _avg: RoleClaimAvgAggregateOutputType | null
    _sum: RoleClaimSumAggregateOutputType | null
    _min: RoleClaimMinAggregateOutputType | null
    _max: RoleClaimMaxAggregateOutputType | null
  }

  export type RoleClaimAvgAggregateOutputType = {
    id: number | null
    roleId: number | null
  }

  export type RoleClaimSumAggregateOutputType = {
    id: number | null
    roleId: number | null
  }

  export type RoleClaimMinAggregateOutputType = {
    id: number | null
    roleId: number | null
    claim: string | null
  }

  export type RoleClaimMaxAggregateOutputType = {
    id: number | null
    roleId: number | null
    claim: string | null
  }

  export type RoleClaimCountAggregateOutputType = {
    id: number
    roleId: number
    claim: number
    _all: number
  }


  export type RoleClaimAvgAggregateInputType = {
    id?: true
    roleId?: true
  }

  export type RoleClaimSumAggregateInputType = {
    id?: true
    roleId?: true
  }

  export type RoleClaimMinAggregateInputType = {
    id?: true
    roleId?: true
    claim?: true
  }

  export type RoleClaimMaxAggregateInputType = {
    id?: true
    roleId?: true
    claim?: true
  }

  export type RoleClaimCountAggregateInputType = {
    id?: true
    roleId?: true
    claim?: true
    _all?: true
  }

  export type RoleClaimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoleClaim to aggregate.
     */
    where?: RoleClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleClaims to fetch.
     */
    orderBy?: RoleClaimOrderByWithRelationInput | RoleClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoleClaims
    **/
    _count?: true | RoleClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleClaimMaxAggregateInputType
  }

  export type GetRoleClaimAggregateType<T extends RoleClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateRoleClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoleClaim[P]>
      : GetScalarType<T[P], AggregateRoleClaim[P]>
  }




  export type RoleClaimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleClaimWhereInput
    orderBy?: RoleClaimOrderByWithAggregationInput | RoleClaimOrderByWithAggregationInput[]
    by: RoleClaimScalarFieldEnum[] | RoleClaimScalarFieldEnum
    having?: RoleClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleClaimCountAggregateInputType | true
    _avg?: RoleClaimAvgAggregateInputType
    _sum?: RoleClaimSumAggregateInputType
    _min?: RoleClaimMinAggregateInputType
    _max?: RoleClaimMaxAggregateInputType
  }

  export type RoleClaimGroupByOutputType = {
    id: number
    roleId: number
    claim: string
    _count: RoleClaimCountAggregateOutputType | null
    _avg: RoleClaimAvgAggregateOutputType | null
    _sum: RoleClaimSumAggregateOutputType | null
    _min: RoleClaimMinAggregateOutputType | null
    _max: RoleClaimMaxAggregateOutputType | null
  }

  type GetRoleClaimGroupByPayload<T extends RoleClaimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleClaimGroupByOutputType[P]>
            : GetScalarType<T[P], RoleClaimGroupByOutputType[P]>
        }
      >
    >


  export type RoleClaimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roleId?: boolean
    claim?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleClaim"]>

  export type RoleClaimSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roleId?: boolean
    claim?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleClaim"]>

  export type RoleClaimSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roleId?: boolean
    claim?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleClaim"]>

  export type RoleClaimSelectScalar = {
    id?: boolean
    roleId?: boolean
    claim?: boolean
  }

  export type RoleClaimOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roleId" | "claim", ExtArgs["result"]["roleClaim"]>
  export type RoleClaimInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type RoleClaimIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type RoleClaimIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $RoleClaimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoleClaim"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      roleId: number
      claim: string
    }, ExtArgs["result"]["roleClaim"]>
    composites: {}
  }

  type RoleClaimGetPayload<S extends boolean | null | undefined | RoleClaimDefaultArgs> = $Result.GetResult<Prisma.$RoleClaimPayload, S>

  type RoleClaimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleClaimFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleClaimCountAggregateInputType | true
    }

  export interface RoleClaimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoleClaim'], meta: { name: 'RoleClaim' } }
    /**
     * Find zero or one RoleClaim that matches the filter.
     * @param {RoleClaimFindUniqueArgs} args - Arguments to find a RoleClaim
     * @example
     * // Get one RoleClaim
     * const roleClaim = await prisma.roleClaim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleClaimFindUniqueArgs>(args: SelectSubset<T, RoleClaimFindUniqueArgs<ExtArgs>>): Prisma__RoleClaimClient<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoleClaim that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleClaimFindUniqueOrThrowArgs} args - Arguments to find a RoleClaim
     * @example
     * // Get one RoleClaim
     * const roleClaim = await prisma.roleClaim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleClaimFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleClaimFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClaimClient<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoleClaim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleClaimFindFirstArgs} args - Arguments to find a RoleClaim
     * @example
     * // Get one RoleClaim
     * const roleClaim = await prisma.roleClaim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleClaimFindFirstArgs>(args?: SelectSubset<T, RoleClaimFindFirstArgs<ExtArgs>>): Prisma__RoleClaimClient<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoleClaim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleClaimFindFirstOrThrowArgs} args - Arguments to find a RoleClaim
     * @example
     * // Get one RoleClaim
     * const roleClaim = await prisma.roleClaim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleClaimFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleClaimFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClaimClient<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoleClaims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleClaimFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoleClaims
     * const roleClaims = await prisma.roleClaim.findMany()
     * 
     * // Get first 10 RoleClaims
     * const roleClaims = await prisma.roleClaim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleClaimWithIdOnly = await prisma.roleClaim.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleClaimFindManyArgs>(args?: SelectSubset<T, RoleClaimFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoleClaim.
     * @param {RoleClaimCreateArgs} args - Arguments to create a RoleClaim.
     * @example
     * // Create one RoleClaim
     * const RoleClaim = await prisma.roleClaim.create({
     *   data: {
     *     // ... data to create a RoleClaim
     *   }
     * })
     * 
     */
    create<T extends RoleClaimCreateArgs>(args: SelectSubset<T, RoleClaimCreateArgs<ExtArgs>>): Prisma__RoleClaimClient<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoleClaims.
     * @param {RoleClaimCreateManyArgs} args - Arguments to create many RoleClaims.
     * @example
     * // Create many RoleClaims
     * const roleClaim = await prisma.roleClaim.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleClaimCreateManyArgs>(args?: SelectSubset<T, RoleClaimCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoleClaims and returns the data saved in the database.
     * @param {RoleClaimCreateManyAndReturnArgs} args - Arguments to create many RoleClaims.
     * @example
     * // Create many RoleClaims
     * const roleClaim = await prisma.roleClaim.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoleClaims and only return the `id`
     * const roleClaimWithIdOnly = await prisma.roleClaim.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleClaimCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleClaimCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoleClaim.
     * @param {RoleClaimDeleteArgs} args - Arguments to delete one RoleClaim.
     * @example
     * // Delete one RoleClaim
     * const RoleClaim = await prisma.roleClaim.delete({
     *   where: {
     *     // ... filter to delete one RoleClaim
     *   }
     * })
     * 
     */
    delete<T extends RoleClaimDeleteArgs>(args: SelectSubset<T, RoleClaimDeleteArgs<ExtArgs>>): Prisma__RoleClaimClient<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoleClaim.
     * @param {RoleClaimUpdateArgs} args - Arguments to update one RoleClaim.
     * @example
     * // Update one RoleClaim
     * const roleClaim = await prisma.roleClaim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleClaimUpdateArgs>(args: SelectSubset<T, RoleClaimUpdateArgs<ExtArgs>>): Prisma__RoleClaimClient<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoleClaims.
     * @param {RoleClaimDeleteManyArgs} args - Arguments to filter RoleClaims to delete.
     * @example
     * // Delete a few RoleClaims
     * const { count } = await prisma.roleClaim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleClaimDeleteManyArgs>(args?: SelectSubset<T, RoleClaimDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoleClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoleClaims
     * const roleClaim = await prisma.roleClaim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleClaimUpdateManyArgs>(args: SelectSubset<T, RoleClaimUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoleClaims and returns the data updated in the database.
     * @param {RoleClaimUpdateManyAndReturnArgs} args - Arguments to update many RoleClaims.
     * @example
     * // Update many RoleClaims
     * const roleClaim = await prisma.roleClaim.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoleClaims and only return the `id`
     * const roleClaimWithIdOnly = await prisma.roleClaim.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleClaimUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleClaimUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoleClaim.
     * @param {RoleClaimUpsertArgs} args - Arguments to update or create a RoleClaim.
     * @example
     * // Update or create a RoleClaim
     * const roleClaim = await prisma.roleClaim.upsert({
     *   create: {
     *     // ... data to create a RoleClaim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoleClaim we want to update
     *   }
     * })
     */
    upsert<T extends RoleClaimUpsertArgs>(args: SelectSubset<T, RoleClaimUpsertArgs<ExtArgs>>): Prisma__RoleClaimClient<$Result.GetResult<Prisma.$RoleClaimPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoleClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleClaimCountArgs} args - Arguments to filter RoleClaims to count.
     * @example
     * // Count the number of RoleClaims
     * const count = await prisma.roleClaim.count({
     *   where: {
     *     // ... the filter for the RoleClaims we want to count
     *   }
     * })
    **/
    count<T extends RoleClaimCountArgs>(
      args?: Subset<T, RoleClaimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoleClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleClaimAggregateArgs>(args: Subset<T, RoleClaimAggregateArgs>): Prisma.PrismaPromise<GetRoleClaimAggregateType<T>>

    /**
     * Group by RoleClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleClaimGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleClaimGroupByArgs['orderBy'] }
        : { orderBy?: RoleClaimGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoleClaim model
   */
  readonly fields: RoleClaimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoleClaim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClaimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoleClaim model
   */
  interface RoleClaimFieldRefs {
    readonly id: FieldRef<"RoleClaim", 'Int'>
    readonly roleId: FieldRef<"RoleClaim", 'Int'>
    readonly claim: FieldRef<"RoleClaim", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RoleClaim findUnique
   */
  export type RoleClaimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
    /**
     * Filter, which RoleClaim to fetch.
     */
    where: RoleClaimWhereUniqueInput
  }

  /**
   * RoleClaim findUniqueOrThrow
   */
  export type RoleClaimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
    /**
     * Filter, which RoleClaim to fetch.
     */
    where: RoleClaimWhereUniqueInput
  }

  /**
   * RoleClaim findFirst
   */
  export type RoleClaimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
    /**
     * Filter, which RoleClaim to fetch.
     */
    where?: RoleClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleClaims to fetch.
     */
    orderBy?: RoleClaimOrderByWithRelationInput | RoleClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoleClaims.
     */
    cursor?: RoleClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleClaims.
     */
    distinct?: RoleClaimScalarFieldEnum | RoleClaimScalarFieldEnum[]
  }

  /**
   * RoleClaim findFirstOrThrow
   */
  export type RoleClaimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
    /**
     * Filter, which RoleClaim to fetch.
     */
    where?: RoleClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleClaims to fetch.
     */
    orderBy?: RoleClaimOrderByWithRelationInput | RoleClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoleClaims.
     */
    cursor?: RoleClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleClaims.
     */
    distinct?: RoleClaimScalarFieldEnum | RoleClaimScalarFieldEnum[]
  }

  /**
   * RoleClaim findMany
   */
  export type RoleClaimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
    /**
     * Filter, which RoleClaims to fetch.
     */
    where?: RoleClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleClaims to fetch.
     */
    orderBy?: RoleClaimOrderByWithRelationInput | RoleClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoleClaims.
     */
    cursor?: RoleClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleClaims.
     */
    skip?: number
    distinct?: RoleClaimScalarFieldEnum | RoleClaimScalarFieldEnum[]
  }

  /**
   * RoleClaim create
   */
  export type RoleClaimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
    /**
     * The data needed to create a RoleClaim.
     */
    data: XOR<RoleClaimCreateInput, RoleClaimUncheckedCreateInput>
  }

  /**
   * RoleClaim createMany
   */
  export type RoleClaimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoleClaims.
     */
    data: RoleClaimCreateManyInput | RoleClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoleClaim createManyAndReturn
   */
  export type RoleClaimCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * The data used to create many RoleClaims.
     */
    data: RoleClaimCreateManyInput | RoleClaimCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoleClaim update
   */
  export type RoleClaimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
    /**
     * The data needed to update a RoleClaim.
     */
    data: XOR<RoleClaimUpdateInput, RoleClaimUncheckedUpdateInput>
    /**
     * Choose, which RoleClaim to update.
     */
    where: RoleClaimWhereUniqueInput
  }

  /**
   * RoleClaim updateMany
   */
  export type RoleClaimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoleClaims.
     */
    data: XOR<RoleClaimUpdateManyMutationInput, RoleClaimUncheckedUpdateManyInput>
    /**
     * Filter which RoleClaims to update
     */
    where?: RoleClaimWhereInput
    /**
     * Limit how many RoleClaims to update.
     */
    limit?: number
  }

  /**
   * RoleClaim updateManyAndReturn
   */
  export type RoleClaimUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * The data used to update RoleClaims.
     */
    data: XOR<RoleClaimUpdateManyMutationInput, RoleClaimUncheckedUpdateManyInput>
    /**
     * Filter which RoleClaims to update
     */
    where?: RoleClaimWhereInput
    /**
     * Limit how many RoleClaims to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoleClaim upsert
   */
  export type RoleClaimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
    /**
     * The filter to search for the RoleClaim to update in case it exists.
     */
    where: RoleClaimWhereUniqueInput
    /**
     * In case the RoleClaim found by the `where` argument doesn't exist, create a new RoleClaim with this data.
     */
    create: XOR<RoleClaimCreateInput, RoleClaimUncheckedCreateInput>
    /**
     * In case the RoleClaim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleClaimUpdateInput, RoleClaimUncheckedUpdateInput>
  }

  /**
   * RoleClaim delete
   */
  export type RoleClaimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
    /**
     * Filter which RoleClaim to delete.
     */
    where: RoleClaimWhereUniqueInput
  }

  /**
   * RoleClaim deleteMany
   */
  export type RoleClaimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoleClaims to delete
     */
    where?: RoleClaimWhereInput
    /**
     * Limit how many RoleClaims to delete.
     */
    limit?: number
  }

  /**
   * RoleClaim without action
   */
  export type RoleClaimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleClaim
     */
    select?: RoleClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleClaim
     */
    omit?: RoleClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleClaimInclude<ExtArgs> | null
  }


  /**
   * Model CT_NguoiDung_KhoaHoc
   */

  export type AggregateCT_NguoiDung_KhoaHoc = {
    _count: CT_NguoiDung_KhoaHocCountAggregateOutputType | null
    _avg: CT_NguoiDung_KhoaHocAvgAggregateOutputType | null
    _sum: CT_NguoiDung_KhoaHocSumAggregateOutputType | null
    _min: CT_NguoiDung_KhoaHocMinAggregateOutputType | null
    _max: CT_NguoiDung_KhoaHocMaxAggregateOutputType | null
  }

  export type CT_NguoiDung_KhoaHocAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    khoaHocId: number | null
  }

  export type CT_NguoiDung_KhoaHocSumAggregateOutputType = {
    id: number | null
    userId: number | null
    khoaHocId: number | null
  }

  export type CT_NguoiDung_KhoaHocMinAggregateOutputType = {
    id: number | null
    userId: number | null
    khoaHocId: number | null
    ngayCapNhat: Date | null
  }

  export type CT_NguoiDung_KhoaHocMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    khoaHocId: number | null
    ngayCapNhat: Date | null
  }

  export type CT_NguoiDung_KhoaHocCountAggregateOutputType = {
    id: number
    userId: number
    khoaHocId: number
    ngayCapNhat: number
    _all: number
  }


  export type CT_NguoiDung_KhoaHocAvgAggregateInputType = {
    id?: true
    userId?: true
    khoaHocId?: true
  }

  export type CT_NguoiDung_KhoaHocSumAggregateInputType = {
    id?: true
    userId?: true
    khoaHocId?: true
  }

  export type CT_NguoiDung_KhoaHocMinAggregateInputType = {
    id?: true
    userId?: true
    khoaHocId?: true
    ngayCapNhat?: true
  }

  export type CT_NguoiDung_KhoaHocMaxAggregateInputType = {
    id?: true
    userId?: true
    khoaHocId?: true
    ngayCapNhat?: true
  }

  export type CT_NguoiDung_KhoaHocCountAggregateInputType = {
    id?: true
    userId?: true
    khoaHocId?: true
    ngayCapNhat?: true
    _all?: true
  }

  export type CT_NguoiDung_KhoaHocAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CT_NguoiDung_KhoaHoc to aggregate.
     */
    where?: CT_NguoiDung_KhoaHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CT_NguoiDung_KhoaHocs to fetch.
     */
    orderBy?: CT_NguoiDung_KhoaHocOrderByWithRelationInput | CT_NguoiDung_KhoaHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CT_NguoiDung_KhoaHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CT_NguoiDung_KhoaHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CT_NguoiDung_KhoaHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CT_NguoiDung_KhoaHocs
    **/
    _count?: true | CT_NguoiDung_KhoaHocCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CT_NguoiDung_KhoaHocAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CT_NguoiDung_KhoaHocSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CT_NguoiDung_KhoaHocMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CT_NguoiDung_KhoaHocMaxAggregateInputType
  }

  export type GetCT_NguoiDung_KhoaHocAggregateType<T extends CT_NguoiDung_KhoaHocAggregateArgs> = {
        [P in keyof T & keyof AggregateCT_NguoiDung_KhoaHoc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCT_NguoiDung_KhoaHoc[P]>
      : GetScalarType<T[P], AggregateCT_NguoiDung_KhoaHoc[P]>
  }




  export type CT_NguoiDung_KhoaHocGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CT_NguoiDung_KhoaHocWhereInput
    orderBy?: CT_NguoiDung_KhoaHocOrderByWithAggregationInput | CT_NguoiDung_KhoaHocOrderByWithAggregationInput[]
    by: CT_NguoiDung_KhoaHocScalarFieldEnum[] | CT_NguoiDung_KhoaHocScalarFieldEnum
    having?: CT_NguoiDung_KhoaHocScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CT_NguoiDung_KhoaHocCountAggregateInputType | true
    _avg?: CT_NguoiDung_KhoaHocAvgAggregateInputType
    _sum?: CT_NguoiDung_KhoaHocSumAggregateInputType
    _min?: CT_NguoiDung_KhoaHocMinAggregateInputType
    _max?: CT_NguoiDung_KhoaHocMaxAggregateInputType
  }

  export type CT_NguoiDung_KhoaHocGroupByOutputType = {
    id: number
    userId: number
    khoaHocId: number
    ngayCapNhat: Date
    _count: CT_NguoiDung_KhoaHocCountAggregateOutputType | null
    _avg: CT_NguoiDung_KhoaHocAvgAggregateOutputType | null
    _sum: CT_NguoiDung_KhoaHocSumAggregateOutputType | null
    _min: CT_NguoiDung_KhoaHocMinAggregateOutputType | null
    _max: CT_NguoiDung_KhoaHocMaxAggregateOutputType | null
  }

  type GetCT_NguoiDung_KhoaHocGroupByPayload<T extends CT_NguoiDung_KhoaHocGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CT_NguoiDung_KhoaHocGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CT_NguoiDung_KhoaHocGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CT_NguoiDung_KhoaHocGroupByOutputType[P]>
            : GetScalarType<T[P], CT_NguoiDung_KhoaHocGroupByOutputType[P]>
        }
      >
    >


  export type CT_NguoiDung_KhoaHocSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    khoaHocId?: boolean
    ngayCapNhat?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    khoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cT_NguoiDung_KhoaHoc"]>

  export type CT_NguoiDung_KhoaHocSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    khoaHocId?: boolean
    ngayCapNhat?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    khoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cT_NguoiDung_KhoaHoc"]>

  export type CT_NguoiDung_KhoaHocSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    khoaHocId?: boolean
    ngayCapNhat?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    khoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cT_NguoiDung_KhoaHoc"]>

  export type CT_NguoiDung_KhoaHocSelectScalar = {
    id?: boolean
    userId?: boolean
    khoaHocId?: boolean
    ngayCapNhat?: boolean
  }

  export type CT_NguoiDung_KhoaHocOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "khoaHocId" | "ngayCapNhat", ExtArgs["result"]["cT_NguoiDung_KhoaHoc"]>
  export type CT_NguoiDung_KhoaHocInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    khoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
  }
  export type CT_NguoiDung_KhoaHocIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    khoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
  }
  export type CT_NguoiDung_KhoaHocIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    khoaHoc?: boolean | KhoaHocDefaultArgs<ExtArgs>
  }

  export type $CT_NguoiDung_KhoaHocPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CT_NguoiDung_KhoaHoc"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      khoaHoc: Prisma.$KhoaHocPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      khoaHocId: number
      ngayCapNhat: Date
    }, ExtArgs["result"]["cT_NguoiDung_KhoaHoc"]>
    composites: {}
  }

  type CT_NguoiDung_KhoaHocGetPayload<S extends boolean | null | undefined | CT_NguoiDung_KhoaHocDefaultArgs> = $Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload, S>

  type CT_NguoiDung_KhoaHocCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CT_NguoiDung_KhoaHocFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CT_NguoiDung_KhoaHocCountAggregateInputType | true
    }

  export interface CT_NguoiDung_KhoaHocDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CT_NguoiDung_KhoaHoc'], meta: { name: 'CT_NguoiDung_KhoaHoc' } }
    /**
     * Find zero or one CT_NguoiDung_KhoaHoc that matches the filter.
     * @param {CT_NguoiDung_KhoaHocFindUniqueArgs} args - Arguments to find a CT_NguoiDung_KhoaHoc
     * @example
     * // Get one CT_NguoiDung_KhoaHoc
     * const cT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CT_NguoiDung_KhoaHocFindUniqueArgs>(args: SelectSubset<T, CT_NguoiDung_KhoaHocFindUniqueArgs<ExtArgs>>): Prisma__CT_NguoiDung_KhoaHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CT_NguoiDung_KhoaHoc that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CT_NguoiDung_KhoaHocFindUniqueOrThrowArgs} args - Arguments to find a CT_NguoiDung_KhoaHoc
     * @example
     * // Get one CT_NguoiDung_KhoaHoc
     * const cT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CT_NguoiDung_KhoaHocFindUniqueOrThrowArgs>(args: SelectSubset<T, CT_NguoiDung_KhoaHocFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CT_NguoiDung_KhoaHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CT_NguoiDung_KhoaHoc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_KhoaHocFindFirstArgs} args - Arguments to find a CT_NguoiDung_KhoaHoc
     * @example
     * // Get one CT_NguoiDung_KhoaHoc
     * const cT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CT_NguoiDung_KhoaHocFindFirstArgs>(args?: SelectSubset<T, CT_NguoiDung_KhoaHocFindFirstArgs<ExtArgs>>): Prisma__CT_NguoiDung_KhoaHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CT_NguoiDung_KhoaHoc that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_KhoaHocFindFirstOrThrowArgs} args - Arguments to find a CT_NguoiDung_KhoaHoc
     * @example
     * // Get one CT_NguoiDung_KhoaHoc
     * const cT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CT_NguoiDung_KhoaHocFindFirstOrThrowArgs>(args?: SelectSubset<T, CT_NguoiDung_KhoaHocFindFirstOrThrowArgs<ExtArgs>>): Prisma__CT_NguoiDung_KhoaHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CT_NguoiDung_KhoaHocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_KhoaHocFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CT_NguoiDung_KhoaHocs
     * const cT_NguoiDung_KhoaHocs = await prisma.cT_NguoiDung_KhoaHoc.findMany()
     * 
     * // Get first 10 CT_NguoiDung_KhoaHocs
     * const cT_NguoiDung_KhoaHocs = await prisma.cT_NguoiDung_KhoaHoc.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cT_NguoiDung_KhoaHocWithIdOnly = await prisma.cT_NguoiDung_KhoaHoc.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CT_NguoiDung_KhoaHocFindManyArgs>(args?: SelectSubset<T, CT_NguoiDung_KhoaHocFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CT_NguoiDung_KhoaHoc.
     * @param {CT_NguoiDung_KhoaHocCreateArgs} args - Arguments to create a CT_NguoiDung_KhoaHoc.
     * @example
     * // Create one CT_NguoiDung_KhoaHoc
     * const CT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.create({
     *   data: {
     *     // ... data to create a CT_NguoiDung_KhoaHoc
     *   }
     * })
     * 
     */
    create<T extends CT_NguoiDung_KhoaHocCreateArgs>(args: SelectSubset<T, CT_NguoiDung_KhoaHocCreateArgs<ExtArgs>>): Prisma__CT_NguoiDung_KhoaHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CT_NguoiDung_KhoaHocs.
     * @param {CT_NguoiDung_KhoaHocCreateManyArgs} args - Arguments to create many CT_NguoiDung_KhoaHocs.
     * @example
     * // Create many CT_NguoiDung_KhoaHocs
     * const cT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CT_NguoiDung_KhoaHocCreateManyArgs>(args?: SelectSubset<T, CT_NguoiDung_KhoaHocCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CT_NguoiDung_KhoaHocs and returns the data saved in the database.
     * @param {CT_NguoiDung_KhoaHocCreateManyAndReturnArgs} args - Arguments to create many CT_NguoiDung_KhoaHocs.
     * @example
     * // Create many CT_NguoiDung_KhoaHocs
     * const cT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CT_NguoiDung_KhoaHocs and only return the `id`
     * const cT_NguoiDung_KhoaHocWithIdOnly = await prisma.cT_NguoiDung_KhoaHoc.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CT_NguoiDung_KhoaHocCreateManyAndReturnArgs>(args?: SelectSubset<T, CT_NguoiDung_KhoaHocCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CT_NguoiDung_KhoaHoc.
     * @param {CT_NguoiDung_KhoaHocDeleteArgs} args - Arguments to delete one CT_NguoiDung_KhoaHoc.
     * @example
     * // Delete one CT_NguoiDung_KhoaHoc
     * const CT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.delete({
     *   where: {
     *     // ... filter to delete one CT_NguoiDung_KhoaHoc
     *   }
     * })
     * 
     */
    delete<T extends CT_NguoiDung_KhoaHocDeleteArgs>(args: SelectSubset<T, CT_NguoiDung_KhoaHocDeleteArgs<ExtArgs>>): Prisma__CT_NguoiDung_KhoaHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CT_NguoiDung_KhoaHoc.
     * @param {CT_NguoiDung_KhoaHocUpdateArgs} args - Arguments to update one CT_NguoiDung_KhoaHoc.
     * @example
     * // Update one CT_NguoiDung_KhoaHoc
     * const cT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CT_NguoiDung_KhoaHocUpdateArgs>(args: SelectSubset<T, CT_NguoiDung_KhoaHocUpdateArgs<ExtArgs>>): Prisma__CT_NguoiDung_KhoaHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CT_NguoiDung_KhoaHocs.
     * @param {CT_NguoiDung_KhoaHocDeleteManyArgs} args - Arguments to filter CT_NguoiDung_KhoaHocs to delete.
     * @example
     * // Delete a few CT_NguoiDung_KhoaHocs
     * const { count } = await prisma.cT_NguoiDung_KhoaHoc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CT_NguoiDung_KhoaHocDeleteManyArgs>(args?: SelectSubset<T, CT_NguoiDung_KhoaHocDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CT_NguoiDung_KhoaHocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_KhoaHocUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CT_NguoiDung_KhoaHocs
     * const cT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CT_NguoiDung_KhoaHocUpdateManyArgs>(args: SelectSubset<T, CT_NguoiDung_KhoaHocUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CT_NguoiDung_KhoaHocs and returns the data updated in the database.
     * @param {CT_NguoiDung_KhoaHocUpdateManyAndReturnArgs} args - Arguments to update many CT_NguoiDung_KhoaHocs.
     * @example
     * // Update many CT_NguoiDung_KhoaHocs
     * const cT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CT_NguoiDung_KhoaHocs and only return the `id`
     * const cT_NguoiDung_KhoaHocWithIdOnly = await prisma.cT_NguoiDung_KhoaHoc.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CT_NguoiDung_KhoaHocUpdateManyAndReturnArgs>(args: SelectSubset<T, CT_NguoiDung_KhoaHocUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CT_NguoiDung_KhoaHoc.
     * @param {CT_NguoiDung_KhoaHocUpsertArgs} args - Arguments to update or create a CT_NguoiDung_KhoaHoc.
     * @example
     * // Update or create a CT_NguoiDung_KhoaHoc
     * const cT_NguoiDung_KhoaHoc = await prisma.cT_NguoiDung_KhoaHoc.upsert({
     *   create: {
     *     // ... data to create a CT_NguoiDung_KhoaHoc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CT_NguoiDung_KhoaHoc we want to update
     *   }
     * })
     */
    upsert<T extends CT_NguoiDung_KhoaHocUpsertArgs>(args: SelectSubset<T, CT_NguoiDung_KhoaHocUpsertArgs<ExtArgs>>): Prisma__CT_NguoiDung_KhoaHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_KhoaHocPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CT_NguoiDung_KhoaHocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_KhoaHocCountArgs} args - Arguments to filter CT_NguoiDung_KhoaHocs to count.
     * @example
     * // Count the number of CT_NguoiDung_KhoaHocs
     * const count = await prisma.cT_NguoiDung_KhoaHoc.count({
     *   where: {
     *     // ... the filter for the CT_NguoiDung_KhoaHocs we want to count
     *   }
     * })
    **/
    count<T extends CT_NguoiDung_KhoaHocCountArgs>(
      args?: Subset<T, CT_NguoiDung_KhoaHocCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CT_NguoiDung_KhoaHocCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CT_NguoiDung_KhoaHoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_KhoaHocAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CT_NguoiDung_KhoaHocAggregateArgs>(args: Subset<T, CT_NguoiDung_KhoaHocAggregateArgs>): Prisma.PrismaPromise<GetCT_NguoiDung_KhoaHocAggregateType<T>>

    /**
     * Group by CT_NguoiDung_KhoaHoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_KhoaHocGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CT_NguoiDung_KhoaHocGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CT_NguoiDung_KhoaHocGroupByArgs['orderBy'] }
        : { orderBy?: CT_NguoiDung_KhoaHocGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CT_NguoiDung_KhoaHocGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCT_NguoiDung_KhoaHocGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CT_NguoiDung_KhoaHoc model
   */
  readonly fields: CT_NguoiDung_KhoaHocFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CT_NguoiDung_KhoaHoc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CT_NguoiDung_KhoaHocClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    khoaHoc<T extends KhoaHocDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KhoaHocDefaultArgs<ExtArgs>>): Prisma__KhoaHocClient<$Result.GetResult<Prisma.$KhoaHocPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CT_NguoiDung_KhoaHoc model
   */
  interface CT_NguoiDung_KhoaHocFieldRefs {
    readonly id: FieldRef<"CT_NguoiDung_KhoaHoc", 'Int'>
    readonly userId: FieldRef<"CT_NguoiDung_KhoaHoc", 'Int'>
    readonly khoaHocId: FieldRef<"CT_NguoiDung_KhoaHoc", 'Int'>
    readonly ngayCapNhat: FieldRef<"CT_NguoiDung_KhoaHoc", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CT_NguoiDung_KhoaHoc findUnique
   */
  export type CT_NguoiDung_KhoaHocFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    /**
     * Filter, which CT_NguoiDung_KhoaHoc to fetch.
     */
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
  }

  /**
   * CT_NguoiDung_KhoaHoc findUniqueOrThrow
   */
  export type CT_NguoiDung_KhoaHocFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    /**
     * Filter, which CT_NguoiDung_KhoaHoc to fetch.
     */
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
  }

  /**
   * CT_NguoiDung_KhoaHoc findFirst
   */
  export type CT_NguoiDung_KhoaHocFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    /**
     * Filter, which CT_NguoiDung_KhoaHoc to fetch.
     */
    where?: CT_NguoiDung_KhoaHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CT_NguoiDung_KhoaHocs to fetch.
     */
    orderBy?: CT_NguoiDung_KhoaHocOrderByWithRelationInput | CT_NguoiDung_KhoaHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CT_NguoiDung_KhoaHocs.
     */
    cursor?: CT_NguoiDung_KhoaHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CT_NguoiDung_KhoaHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CT_NguoiDung_KhoaHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CT_NguoiDung_KhoaHocs.
     */
    distinct?: CT_NguoiDung_KhoaHocScalarFieldEnum | CT_NguoiDung_KhoaHocScalarFieldEnum[]
  }

  /**
   * CT_NguoiDung_KhoaHoc findFirstOrThrow
   */
  export type CT_NguoiDung_KhoaHocFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    /**
     * Filter, which CT_NguoiDung_KhoaHoc to fetch.
     */
    where?: CT_NguoiDung_KhoaHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CT_NguoiDung_KhoaHocs to fetch.
     */
    orderBy?: CT_NguoiDung_KhoaHocOrderByWithRelationInput | CT_NguoiDung_KhoaHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CT_NguoiDung_KhoaHocs.
     */
    cursor?: CT_NguoiDung_KhoaHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CT_NguoiDung_KhoaHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CT_NguoiDung_KhoaHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CT_NguoiDung_KhoaHocs.
     */
    distinct?: CT_NguoiDung_KhoaHocScalarFieldEnum | CT_NguoiDung_KhoaHocScalarFieldEnum[]
  }

  /**
   * CT_NguoiDung_KhoaHoc findMany
   */
  export type CT_NguoiDung_KhoaHocFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    /**
     * Filter, which CT_NguoiDung_KhoaHocs to fetch.
     */
    where?: CT_NguoiDung_KhoaHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CT_NguoiDung_KhoaHocs to fetch.
     */
    orderBy?: CT_NguoiDung_KhoaHocOrderByWithRelationInput | CT_NguoiDung_KhoaHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CT_NguoiDung_KhoaHocs.
     */
    cursor?: CT_NguoiDung_KhoaHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CT_NguoiDung_KhoaHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CT_NguoiDung_KhoaHocs.
     */
    skip?: number
    distinct?: CT_NguoiDung_KhoaHocScalarFieldEnum | CT_NguoiDung_KhoaHocScalarFieldEnum[]
  }

  /**
   * CT_NguoiDung_KhoaHoc create
   */
  export type CT_NguoiDung_KhoaHocCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    /**
     * The data needed to create a CT_NguoiDung_KhoaHoc.
     */
    data: XOR<CT_NguoiDung_KhoaHocCreateInput, CT_NguoiDung_KhoaHocUncheckedCreateInput>
  }

  /**
   * CT_NguoiDung_KhoaHoc createMany
   */
  export type CT_NguoiDung_KhoaHocCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CT_NguoiDung_KhoaHocs.
     */
    data: CT_NguoiDung_KhoaHocCreateManyInput | CT_NguoiDung_KhoaHocCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CT_NguoiDung_KhoaHoc createManyAndReturn
   */
  export type CT_NguoiDung_KhoaHocCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * The data used to create many CT_NguoiDung_KhoaHocs.
     */
    data: CT_NguoiDung_KhoaHocCreateManyInput | CT_NguoiDung_KhoaHocCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CT_NguoiDung_KhoaHoc update
   */
  export type CT_NguoiDung_KhoaHocUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    /**
     * The data needed to update a CT_NguoiDung_KhoaHoc.
     */
    data: XOR<CT_NguoiDung_KhoaHocUpdateInput, CT_NguoiDung_KhoaHocUncheckedUpdateInput>
    /**
     * Choose, which CT_NguoiDung_KhoaHoc to update.
     */
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
  }

  /**
   * CT_NguoiDung_KhoaHoc updateMany
   */
  export type CT_NguoiDung_KhoaHocUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CT_NguoiDung_KhoaHocs.
     */
    data: XOR<CT_NguoiDung_KhoaHocUpdateManyMutationInput, CT_NguoiDung_KhoaHocUncheckedUpdateManyInput>
    /**
     * Filter which CT_NguoiDung_KhoaHocs to update
     */
    where?: CT_NguoiDung_KhoaHocWhereInput
    /**
     * Limit how many CT_NguoiDung_KhoaHocs to update.
     */
    limit?: number
  }

  /**
   * CT_NguoiDung_KhoaHoc updateManyAndReturn
   */
  export type CT_NguoiDung_KhoaHocUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * The data used to update CT_NguoiDung_KhoaHocs.
     */
    data: XOR<CT_NguoiDung_KhoaHocUpdateManyMutationInput, CT_NguoiDung_KhoaHocUncheckedUpdateManyInput>
    /**
     * Filter which CT_NguoiDung_KhoaHocs to update
     */
    where?: CT_NguoiDung_KhoaHocWhereInput
    /**
     * Limit how many CT_NguoiDung_KhoaHocs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CT_NguoiDung_KhoaHoc upsert
   */
  export type CT_NguoiDung_KhoaHocUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    /**
     * The filter to search for the CT_NguoiDung_KhoaHoc to update in case it exists.
     */
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
    /**
     * In case the CT_NguoiDung_KhoaHoc found by the `where` argument doesn't exist, create a new CT_NguoiDung_KhoaHoc with this data.
     */
    create: XOR<CT_NguoiDung_KhoaHocCreateInput, CT_NguoiDung_KhoaHocUncheckedCreateInput>
    /**
     * In case the CT_NguoiDung_KhoaHoc was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CT_NguoiDung_KhoaHocUpdateInput, CT_NguoiDung_KhoaHocUncheckedUpdateInput>
  }

  /**
   * CT_NguoiDung_KhoaHoc delete
   */
  export type CT_NguoiDung_KhoaHocDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
    /**
     * Filter which CT_NguoiDung_KhoaHoc to delete.
     */
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
  }

  /**
   * CT_NguoiDung_KhoaHoc deleteMany
   */
  export type CT_NguoiDung_KhoaHocDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CT_NguoiDung_KhoaHocs to delete
     */
    where?: CT_NguoiDung_KhoaHocWhereInput
    /**
     * Limit how many CT_NguoiDung_KhoaHocs to delete.
     */
    limit?: number
  }

  /**
   * CT_NguoiDung_KhoaHoc without action
   */
  export type CT_NguoiDung_KhoaHocDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_KhoaHoc
     */
    select?: CT_NguoiDung_KhoaHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_KhoaHoc
     */
    omit?: CT_NguoiDung_KhoaHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_KhoaHocInclude<ExtArgs> | null
  }


  /**
   * Model CT_NguoiDung_BaiHoc
   */

  export type AggregateCT_NguoiDung_BaiHoc = {
    _count: CT_NguoiDung_BaiHocCountAggregateOutputType | null
    _avg: CT_NguoiDung_BaiHocAvgAggregateOutputType | null
    _sum: CT_NguoiDung_BaiHocSumAggregateOutputType | null
    _min: CT_NguoiDung_BaiHocMinAggregateOutputType | null
    _max: CT_NguoiDung_BaiHocMaxAggregateOutputType | null
  }

  export type CT_NguoiDung_BaiHocAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    baiHocId: number | null
  }

  export type CT_NguoiDung_BaiHocSumAggregateOutputType = {
    id: number | null
    userId: number | null
    baiHocId: number | null
  }

  export type CT_NguoiDung_BaiHocMinAggregateOutputType = {
    id: number | null
    userId: number | null
    baiHocId: number | null
    ngayCapNhat: Date | null
  }

  export type CT_NguoiDung_BaiHocMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    baiHocId: number | null
    ngayCapNhat: Date | null
  }

  export type CT_NguoiDung_BaiHocCountAggregateOutputType = {
    id: number
    userId: number
    baiHocId: number
    ngayCapNhat: number
    _all: number
  }


  export type CT_NguoiDung_BaiHocAvgAggregateInputType = {
    id?: true
    userId?: true
    baiHocId?: true
  }

  export type CT_NguoiDung_BaiHocSumAggregateInputType = {
    id?: true
    userId?: true
    baiHocId?: true
  }

  export type CT_NguoiDung_BaiHocMinAggregateInputType = {
    id?: true
    userId?: true
    baiHocId?: true
    ngayCapNhat?: true
  }

  export type CT_NguoiDung_BaiHocMaxAggregateInputType = {
    id?: true
    userId?: true
    baiHocId?: true
    ngayCapNhat?: true
  }

  export type CT_NguoiDung_BaiHocCountAggregateInputType = {
    id?: true
    userId?: true
    baiHocId?: true
    ngayCapNhat?: true
    _all?: true
  }

  export type CT_NguoiDung_BaiHocAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CT_NguoiDung_BaiHoc to aggregate.
     */
    where?: CT_NguoiDung_BaiHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CT_NguoiDung_BaiHocs to fetch.
     */
    orderBy?: CT_NguoiDung_BaiHocOrderByWithRelationInput | CT_NguoiDung_BaiHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CT_NguoiDung_BaiHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CT_NguoiDung_BaiHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CT_NguoiDung_BaiHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CT_NguoiDung_BaiHocs
    **/
    _count?: true | CT_NguoiDung_BaiHocCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CT_NguoiDung_BaiHocAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CT_NguoiDung_BaiHocSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CT_NguoiDung_BaiHocMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CT_NguoiDung_BaiHocMaxAggregateInputType
  }

  export type GetCT_NguoiDung_BaiHocAggregateType<T extends CT_NguoiDung_BaiHocAggregateArgs> = {
        [P in keyof T & keyof AggregateCT_NguoiDung_BaiHoc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCT_NguoiDung_BaiHoc[P]>
      : GetScalarType<T[P], AggregateCT_NguoiDung_BaiHoc[P]>
  }




  export type CT_NguoiDung_BaiHocGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CT_NguoiDung_BaiHocWhereInput
    orderBy?: CT_NguoiDung_BaiHocOrderByWithAggregationInput | CT_NguoiDung_BaiHocOrderByWithAggregationInput[]
    by: CT_NguoiDung_BaiHocScalarFieldEnum[] | CT_NguoiDung_BaiHocScalarFieldEnum
    having?: CT_NguoiDung_BaiHocScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CT_NguoiDung_BaiHocCountAggregateInputType | true
    _avg?: CT_NguoiDung_BaiHocAvgAggregateInputType
    _sum?: CT_NguoiDung_BaiHocSumAggregateInputType
    _min?: CT_NguoiDung_BaiHocMinAggregateInputType
    _max?: CT_NguoiDung_BaiHocMaxAggregateInputType
  }

  export type CT_NguoiDung_BaiHocGroupByOutputType = {
    id: number
    userId: number
    baiHocId: number
    ngayCapNhat: Date
    _count: CT_NguoiDung_BaiHocCountAggregateOutputType | null
    _avg: CT_NguoiDung_BaiHocAvgAggregateOutputType | null
    _sum: CT_NguoiDung_BaiHocSumAggregateOutputType | null
    _min: CT_NguoiDung_BaiHocMinAggregateOutputType | null
    _max: CT_NguoiDung_BaiHocMaxAggregateOutputType | null
  }

  type GetCT_NguoiDung_BaiHocGroupByPayload<T extends CT_NguoiDung_BaiHocGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CT_NguoiDung_BaiHocGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CT_NguoiDung_BaiHocGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CT_NguoiDung_BaiHocGroupByOutputType[P]>
            : GetScalarType<T[P], CT_NguoiDung_BaiHocGroupByOutputType[P]>
        }
      >
    >


  export type CT_NguoiDung_BaiHocSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    baiHocId?: boolean
    ngayCapNhat?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    baiHoc?: boolean | BaiHocDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cT_NguoiDung_BaiHoc"]>

  export type CT_NguoiDung_BaiHocSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    baiHocId?: boolean
    ngayCapNhat?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    baiHoc?: boolean | BaiHocDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cT_NguoiDung_BaiHoc"]>

  export type CT_NguoiDung_BaiHocSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    baiHocId?: boolean
    ngayCapNhat?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    baiHoc?: boolean | BaiHocDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cT_NguoiDung_BaiHoc"]>

  export type CT_NguoiDung_BaiHocSelectScalar = {
    id?: boolean
    userId?: boolean
    baiHocId?: boolean
    ngayCapNhat?: boolean
  }

  export type CT_NguoiDung_BaiHocOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "baiHocId" | "ngayCapNhat", ExtArgs["result"]["cT_NguoiDung_BaiHoc"]>
  export type CT_NguoiDung_BaiHocInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    baiHoc?: boolean | BaiHocDefaultArgs<ExtArgs>
  }
  export type CT_NguoiDung_BaiHocIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    baiHoc?: boolean | BaiHocDefaultArgs<ExtArgs>
  }
  export type CT_NguoiDung_BaiHocIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    baiHoc?: boolean | BaiHocDefaultArgs<ExtArgs>
  }

  export type $CT_NguoiDung_BaiHocPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CT_NguoiDung_BaiHoc"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      baiHoc: Prisma.$BaiHocPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      baiHocId: number
      ngayCapNhat: Date
    }, ExtArgs["result"]["cT_NguoiDung_BaiHoc"]>
    composites: {}
  }

  type CT_NguoiDung_BaiHocGetPayload<S extends boolean | null | undefined | CT_NguoiDung_BaiHocDefaultArgs> = $Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload, S>

  type CT_NguoiDung_BaiHocCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CT_NguoiDung_BaiHocFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CT_NguoiDung_BaiHocCountAggregateInputType | true
    }

  export interface CT_NguoiDung_BaiHocDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CT_NguoiDung_BaiHoc'], meta: { name: 'CT_NguoiDung_BaiHoc' } }
    /**
     * Find zero or one CT_NguoiDung_BaiHoc that matches the filter.
     * @param {CT_NguoiDung_BaiHocFindUniqueArgs} args - Arguments to find a CT_NguoiDung_BaiHoc
     * @example
     * // Get one CT_NguoiDung_BaiHoc
     * const cT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CT_NguoiDung_BaiHocFindUniqueArgs>(args: SelectSubset<T, CT_NguoiDung_BaiHocFindUniqueArgs<ExtArgs>>): Prisma__CT_NguoiDung_BaiHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CT_NguoiDung_BaiHoc that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CT_NguoiDung_BaiHocFindUniqueOrThrowArgs} args - Arguments to find a CT_NguoiDung_BaiHoc
     * @example
     * // Get one CT_NguoiDung_BaiHoc
     * const cT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CT_NguoiDung_BaiHocFindUniqueOrThrowArgs>(args: SelectSubset<T, CT_NguoiDung_BaiHocFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CT_NguoiDung_BaiHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CT_NguoiDung_BaiHoc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_BaiHocFindFirstArgs} args - Arguments to find a CT_NguoiDung_BaiHoc
     * @example
     * // Get one CT_NguoiDung_BaiHoc
     * const cT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CT_NguoiDung_BaiHocFindFirstArgs>(args?: SelectSubset<T, CT_NguoiDung_BaiHocFindFirstArgs<ExtArgs>>): Prisma__CT_NguoiDung_BaiHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CT_NguoiDung_BaiHoc that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_BaiHocFindFirstOrThrowArgs} args - Arguments to find a CT_NguoiDung_BaiHoc
     * @example
     * // Get one CT_NguoiDung_BaiHoc
     * const cT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CT_NguoiDung_BaiHocFindFirstOrThrowArgs>(args?: SelectSubset<T, CT_NguoiDung_BaiHocFindFirstOrThrowArgs<ExtArgs>>): Prisma__CT_NguoiDung_BaiHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CT_NguoiDung_BaiHocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_BaiHocFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CT_NguoiDung_BaiHocs
     * const cT_NguoiDung_BaiHocs = await prisma.cT_NguoiDung_BaiHoc.findMany()
     * 
     * // Get first 10 CT_NguoiDung_BaiHocs
     * const cT_NguoiDung_BaiHocs = await prisma.cT_NguoiDung_BaiHoc.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cT_NguoiDung_BaiHocWithIdOnly = await prisma.cT_NguoiDung_BaiHoc.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CT_NguoiDung_BaiHocFindManyArgs>(args?: SelectSubset<T, CT_NguoiDung_BaiHocFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CT_NguoiDung_BaiHoc.
     * @param {CT_NguoiDung_BaiHocCreateArgs} args - Arguments to create a CT_NguoiDung_BaiHoc.
     * @example
     * // Create one CT_NguoiDung_BaiHoc
     * const CT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.create({
     *   data: {
     *     // ... data to create a CT_NguoiDung_BaiHoc
     *   }
     * })
     * 
     */
    create<T extends CT_NguoiDung_BaiHocCreateArgs>(args: SelectSubset<T, CT_NguoiDung_BaiHocCreateArgs<ExtArgs>>): Prisma__CT_NguoiDung_BaiHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CT_NguoiDung_BaiHocs.
     * @param {CT_NguoiDung_BaiHocCreateManyArgs} args - Arguments to create many CT_NguoiDung_BaiHocs.
     * @example
     * // Create many CT_NguoiDung_BaiHocs
     * const cT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CT_NguoiDung_BaiHocCreateManyArgs>(args?: SelectSubset<T, CT_NguoiDung_BaiHocCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CT_NguoiDung_BaiHocs and returns the data saved in the database.
     * @param {CT_NguoiDung_BaiHocCreateManyAndReturnArgs} args - Arguments to create many CT_NguoiDung_BaiHocs.
     * @example
     * // Create many CT_NguoiDung_BaiHocs
     * const cT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CT_NguoiDung_BaiHocs and only return the `id`
     * const cT_NguoiDung_BaiHocWithIdOnly = await prisma.cT_NguoiDung_BaiHoc.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CT_NguoiDung_BaiHocCreateManyAndReturnArgs>(args?: SelectSubset<T, CT_NguoiDung_BaiHocCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CT_NguoiDung_BaiHoc.
     * @param {CT_NguoiDung_BaiHocDeleteArgs} args - Arguments to delete one CT_NguoiDung_BaiHoc.
     * @example
     * // Delete one CT_NguoiDung_BaiHoc
     * const CT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.delete({
     *   where: {
     *     // ... filter to delete one CT_NguoiDung_BaiHoc
     *   }
     * })
     * 
     */
    delete<T extends CT_NguoiDung_BaiHocDeleteArgs>(args: SelectSubset<T, CT_NguoiDung_BaiHocDeleteArgs<ExtArgs>>): Prisma__CT_NguoiDung_BaiHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CT_NguoiDung_BaiHoc.
     * @param {CT_NguoiDung_BaiHocUpdateArgs} args - Arguments to update one CT_NguoiDung_BaiHoc.
     * @example
     * // Update one CT_NguoiDung_BaiHoc
     * const cT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CT_NguoiDung_BaiHocUpdateArgs>(args: SelectSubset<T, CT_NguoiDung_BaiHocUpdateArgs<ExtArgs>>): Prisma__CT_NguoiDung_BaiHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CT_NguoiDung_BaiHocs.
     * @param {CT_NguoiDung_BaiHocDeleteManyArgs} args - Arguments to filter CT_NguoiDung_BaiHocs to delete.
     * @example
     * // Delete a few CT_NguoiDung_BaiHocs
     * const { count } = await prisma.cT_NguoiDung_BaiHoc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CT_NguoiDung_BaiHocDeleteManyArgs>(args?: SelectSubset<T, CT_NguoiDung_BaiHocDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CT_NguoiDung_BaiHocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_BaiHocUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CT_NguoiDung_BaiHocs
     * const cT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CT_NguoiDung_BaiHocUpdateManyArgs>(args: SelectSubset<T, CT_NguoiDung_BaiHocUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CT_NguoiDung_BaiHocs and returns the data updated in the database.
     * @param {CT_NguoiDung_BaiHocUpdateManyAndReturnArgs} args - Arguments to update many CT_NguoiDung_BaiHocs.
     * @example
     * // Update many CT_NguoiDung_BaiHocs
     * const cT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CT_NguoiDung_BaiHocs and only return the `id`
     * const cT_NguoiDung_BaiHocWithIdOnly = await prisma.cT_NguoiDung_BaiHoc.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CT_NguoiDung_BaiHocUpdateManyAndReturnArgs>(args: SelectSubset<T, CT_NguoiDung_BaiHocUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CT_NguoiDung_BaiHoc.
     * @param {CT_NguoiDung_BaiHocUpsertArgs} args - Arguments to update or create a CT_NguoiDung_BaiHoc.
     * @example
     * // Update or create a CT_NguoiDung_BaiHoc
     * const cT_NguoiDung_BaiHoc = await prisma.cT_NguoiDung_BaiHoc.upsert({
     *   create: {
     *     // ... data to create a CT_NguoiDung_BaiHoc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CT_NguoiDung_BaiHoc we want to update
     *   }
     * })
     */
    upsert<T extends CT_NguoiDung_BaiHocUpsertArgs>(args: SelectSubset<T, CT_NguoiDung_BaiHocUpsertArgs<ExtArgs>>): Prisma__CT_NguoiDung_BaiHocClient<$Result.GetResult<Prisma.$CT_NguoiDung_BaiHocPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CT_NguoiDung_BaiHocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_BaiHocCountArgs} args - Arguments to filter CT_NguoiDung_BaiHocs to count.
     * @example
     * // Count the number of CT_NguoiDung_BaiHocs
     * const count = await prisma.cT_NguoiDung_BaiHoc.count({
     *   where: {
     *     // ... the filter for the CT_NguoiDung_BaiHocs we want to count
     *   }
     * })
    **/
    count<T extends CT_NguoiDung_BaiHocCountArgs>(
      args?: Subset<T, CT_NguoiDung_BaiHocCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CT_NguoiDung_BaiHocCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CT_NguoiDung_BaiHoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_BaiHocAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CT_NguoiDung_BaiHocAggregateArgs>(args: Subset<T, CT_NguoiDung_BaiHocAggregateArgs>): Prisma.PrismaPromise<GetCT_NguoiDung_BaiHocAggregateType<T>>

    /**
     * Group by CT_NguoiDung_BaiHoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CT_NguoiDung_BaiHocGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CT_NguoiDung_BaiHocGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CT_NguoiDung_BaiHocGroupByArgs['orderBy'] }
        : { orderBy?: CT_NguoiDung_BaiHocGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CT_NguoiDung_BaiHocGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCT_NguoiDung_BaiHocGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CT_NguoiDung_BaiHoc model
   */
  readonly fields: CT_NguoiDung_BaiHocFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CT_NguoiDung_BaiHoc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CT_NguoiDung_BaiHocClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    baiHoc<T extends BaiHocDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BaiHocDefaultArgs<ExtArgs>>): Prisma__BaiHocClient<$Result.GetResult<Prisma.$BaiHocPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CT_NguoiDung_BaiHoc model
   */
  interface CT_NguoiDung_BaiHocFieldRefs {
    readonly id: FieldRef<"CT_NguoiDung_BaiHoc", 'Int'>
    readonly userId: FieldRef<"CT_NguoiDung_BaiHoc", 'Int'>
    readonly baiHocId: FieldRef<"CT_NguoiDung_BaiHoc", 'Int'>
    readonly ngayCapNhat: FieldRef<"CT_NguoiDung_BaiHoc", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CT_NguoiDung_BaiHoc findUnique
   */
  export type CT_NguoiDung_BaiHocFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    /**
     * Filter, which CT_NguoiDung_BaiHoc to fetch.
     */
    where: CT_NguoiDung_BaiHocWhereUniqueInput
  }

  /**
   * CT_NguoiDung_BaiHoc findUniqueOrThrow
   */
  export type CT_NguoiDung_BaiHocFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    /**
     * Filter, which CT_NguoiDung_BaiHoc to fetch.
     */
    where: CT_NguoiDung_BaiHocWhereUniqueInput
  }

  /**
   * CT_NguoiDung_BaiHoc findFirst
   */
  export type CT_NguoiDung_BaiHocFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    /**
     * Filter, which CT_NguoiDung_BaiHoc to fetch.
     */
    where?: CT_NguoiDung_BaiHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CT_NguoiDung_BaiHocs to fetch.
     */
    orderBy?: CT_NguoiDung_BaiHocOrderByWithRelationInput | CT_NguoiDung_BaiHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CT_NguoiDung_BaiHocs.
     */
    cursor?: CT_NguoiDung_BaiHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CT_NguoiDung_BaiHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CT_NguoiDung_BaiHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CT_NguoiDung_BaiHocs.
     */
    distinct?: CT_NguoiDung_BaiHocScalarFieldEnum | CT_NguoiDung_BaiHocScalarFieldEnum[]
  }

  /**
   * CT_NguoiDung_BaiHoc findFirstOrThrow
   */
  export type CT_NguoiDung_BaiHocFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    /**
     * Filter, which CT_NguoiDung_BaiHoc to fetch.
     */
    where?: CT_NguoiDung_BaiHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CT_NguoiDung_BaiHocs to fetch.
     */
    orderBy?: CT_NguoiDung_BaiHocOrderByWithRelationInput | CT_NguoiDung_BaiHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CT_NguoiDung_BaiHocs.
     */
    cursor?: CT_NguoiDung_BaiHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CT_NguoiDung_BaiHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CT_NguoiDung_BaiHocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CT_NguoiDung_BaiHocs.
     */
    distinct?: CT_NguoiDung_BaiHocScalarFieldEnum | CT_NguoiDung_BaiHocScalarFieldEnum[]
  }

  /**
   * CT_NguoiDung_BaiHoc findMany
   */
  export type CT_NguoiDung_BaiHocFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    /**
     * Filter, which CT_NguoiDung_BaiHocs to fetch.
     */
    where?: CT_NguoiDung_BaiHocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CT_NguoiDung_BaiHocs to fetch.
     */
    orderBy?: CT_NguoiDung_BaiHocOrderByWithRelationInput | CT_NguoiDung_BaiHocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CT_NguoiDung_BaiHocs.
     */
    cursor?: CT_NguoiDung_BaiHocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CT_NguoiDung_BaiHocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CT_NguoiDung_BaiHocs.
     */
    skip?: number
    distinct?: CT_NguoiDung_BaiHocScalarFieldEnum | CT_NguoiDung_BaiHocScalarFieldEnum[]
  }

  /**
   * CT_NguoiDung_BaiHoc create
   */
  export type CT_NguoiDung_BaiHocCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    /**
     * The data needed to create a CT_NguoiDung_BaiHoc.
     */
    data: XOR<CT_NguoiDung_BaiHocCreateInput, CT_NguoiDung_BaiHocUncheckedCreateInput>
  }

  /**
   * CT_NguoiDung_BaiHoc createMany
   */
  export type CT_NguoiDung_BaiHocCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CT_NguoiDung_BaiHocs.
     */
    data: CT_NguoiDung_BaiHocCreateManyInput | CT_NguoiDung_BaiHocCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CT_NguoiDung_BaiHoc createManyAndReturn
   */
  export type CT_NguoiDung_BaiHocCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * The data used to create many CT_NguoiDung_BaiHocs.
     */
    data: CT_NguoiDung_BaiHocCreateManyInput | CT_NguoiDung_BaiHocCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CT_NguoiDung_BaiHoc update
   */
  export type CT_NguoiDung_BaiHocUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    /**
     * The data needed to update a CT_NguoiDung_BaiHoc.
     */
    data: XOR<CT_NguoiDung_BaiHocUpdateInput, CT_NguoiDung_BaiHocUncheckedUpdateInput>
    /**
     * Choose, which CT_NguoiDung_BaiHoc to update.
     */
    where: CT_NguoiDung_BaiHocWhereUniqueInput
  }

  /**
   * CT_NguoiDung_BaiHoc updateMany
   */
  export type CT_NguoiDung_BaiHocUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CT_NguoiDung_BaiHocs.
     */
    data: XOR<CT_NguoiDung_BaiHocUpdateManyMutationInput, CT_NguoiDung_BaiHocUncheckedUpdateManyInput>
    /**
     * Filter which CT_NguoiDung_BaiHocs to update
     */
    where?: CT_NguoiDung_BaiHocWhereInput
    /**
     * Limit how many CT_NguoiDung_BaiHocs to update.
     */
    limit?: number
  }

  /**
   * CT_NguoiDung_BaiHoc updateManyAndReturn
   */
  export type CT_NguoiDung_BaiHocUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * The data used to update CT_NguoiDung_BaiHocs.
     */
    data: XOR<CT_NguoiDung_BaiHocUpdateManyMutationInput, CT_NguoiDung_BaiHocUncheckedUpdateManyInput>
    /**
     * Filter which CT_NguoiDung_BaiHocs to update
     */
    where?: CT_NguoiDung_BaiHocWhereInput
    /**
     * Limit how many CT_NguoiDung_BaiHocs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CT_NguoiDung_BaiHoc upsert
   */
  export type CT_NguoiDung_BaiHocUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    /**
     * The filter to search for the CT_NguoiDung_BaiHoc to update in case it exists.
     */
    where: CT_NguoiDung_BaiHocWhereUniqueInput
    /**
     * In case the CT_NguoiDung_BaiHoc found by the `where` argument doesn't exist, create a new CT_NguoiDung_BaiHoc with this data.
     */
    create: XOR<CT_NguoiDung_BaiHocCreateInput, CT_NguoiDung_BaiHocUncheckedCreateInput>
    /**
     * In case the CT_NguoiDung_BaiHoc was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CT_NguoiDung_BaiHocUpdateInput, CT_NguoiDung_BaiHocUncheckedUpdateInput>
  }

  /**
   * CT_NguoiDung_BaiHoc delete
   */
  export type CT_NguoiDung_BaiHocDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
    /**
     * Filter which CT_NguoiDung_BaiHoc to delete.
     */
    where: CT_NguoiDung_BaiHocWhereUniqueInput
  }

  /**
   * CT_NguoiDung_BaiHoc deleteMany
   */
  export type CT_NguoiDung_BaiHocDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CT_NguoiDung_BaiHocs to delete
     */
    where?: CT_NguoiDung_BaiHocWhereInput
    /**
     * Limit how many CT_NguoiDung_BaiHocs to delete.
     */
    limit?: number
  }

  /**
   * CT_NguoiDung_BaiHoc without action
   */
  export type CT_NguoiDung_BaiHocDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CT_NguoiDung_BaiHoc
     */
    select?: CT_NguoiDung_BaiHocSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CT_NguoiDung_BaiHoc
     */
    omit?: CT_NguoiDung_BaiHocOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CT_NguoiDung_BaiHocInclude<ExtArgs> | null
  }


  /**
   * Model CauHoiGame
   */

  export type AggregateCauHoiGame = {
    _count: CauHoiGameCountAggregateOutputType | null
    _avg: CauHoiGameAvgAggregateOutputType | null
    _sum: CauHoiGameSumAggregateOutputType | null
    _min: CauHoiGameMinAggregateOutputType | null
    _max: CauHoiGameMaxAggregateOutputType | null
  }

  export type CauHoiGameAvgAggregateOutputType = {
    id: number | null
  }

  export type CauHoiGameSumAggregateOutputType = {
    id: number | null
  }

  export type CauHoiGameMinAggregateOutputType = {
    id: number | null
    noiDung: string | null
    dapAn: string | null
    capDo: string | null
    chuDe: string | null
    createdAt: Date | null
  }

  export type CauHoiGameMaxAggregateOutputType = {
    id: number | null
    noiDung: string | null
    dapAn: string | null
    capDo: string | null
    chuDe: string | null
    createdAt: Date | null
  }

  export type CauHoiGameCountAggregateOutputType = {
    id: number
    noiDung: number
    dapAn: number
    capDo: number
    chuDe: number
    createdAt: number
    _all: number
  }


  export type CauHoiGameAvgAggregateInputType = {
    id?: true
  }

  export type CauHoiGameSumAggregateInputType = {
    id?: true
  }

  export type CauHoiGameMinAggregateInputType = {
    id?: true
    noiDung?: true
    dapAn?: true
    capDo?: true
    chuDe?: true
    createdAt?: true
  }

  export type CauHoiGameMaxAggregateInputType = {
    id?: true
    noiDung?: true
    dapAn?: true
    capDo?: true
    chuDe?: true
    createdAt?: true
  }

  export type CauHoiGameCountAggregateInputType = {
    id?: true
    noiDung?: true
    dapAn?: true
    capDo?: true
    chuDe?: true
    createdAt?: true
    _all?: true
  }

  export type CauHoiGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CauHoiGame to aggregate.
     */
    where?: CauHoiGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CauHoiGames to fetch.
     */
    orderBy?: CauHoiGameOrderByWithRelationInput | CauHoiGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CauHoiGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CauHoiGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CauHoiGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CauHoiGames
    **/
    _count?: true | CauHoiGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CauHoiGameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CauHoiGameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CauHoiGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CauHoiGameMaxAggregateInputType
  }

  export type GetCauHoiGameAggregateType<T extends CauHoiGameAggregateArgs> = {
        [P in keyof T & keyof AggregateCauHoiGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCauHoiGame[P]>
      : GetScalarType<T[P], AggregateCauHoiGame[P]>
  }




  export type CauHoiGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CauHoiGameWhereInput
    orderBy?: CauHoiGameOrderByWithAggregationInput | CauHoiGameOrderByWithAggregationInput[]
    by: CauHoiGameScalarFieldEnum[] | CauHoiGameScalarFieldEnum
    having?: CauHoiGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CauHoiGameCountAggregateInputType | true
    _avg?: CauHoiGameAvgAggregateInputType
    _sum?: CauHoiGameSumAggregateInputType
    _min?: CauHoiGameMinAggregateInputType
    _max?: CauHoiGameMaxAggregateInputType
  }

  export type CauHoiGameGroupByOutputType = {
    id: number
    noiDung: string
    dapAn: string
    capDo: string | null
    chuDe: string | null
    createdAt: Date
    _count: CauHoiGameCountAggregateOutputType | null
    _avg: CauHoiGameAvgAggregateOutputType | null
    _sum: CauHoiGameSumAggregateOutputType | null
    _min: CauHoiGameMinAggregateOutputType | null
    _max: CauHoiGameMaxAggregateOutputType | null
  }

  type GetCauHoiGameGroupByPayload<T extends CauHoiGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CauHoiGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CauHoiGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CauHoiGameGroupByOutputType[P]>
            : GetScalarType<T[P], CauHoiGameGroupByOutputType[P]>
        }
      >
    >


  export type CauHoiGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    noiDung?: boolean
    dapAn?: boolean
    capDo?: boolean
    chuDe?: boolean
    createdAt?: boolean
    lichSuChoiGames?: boolean | CauHoiGame$lichSuChoiGamesArgs<ExtArgs>
    _count?: boolean | CauHoiGameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cauHoiGame"]>

  export type CauHoiGameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    noiDung?: boolean
    dapAn?: boolean
    capDo?: boolean
    chuDe?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["cauHoiGame"]>

  export type CauHoiGameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    noiDung?: boolean
    dapAn?: boolean
    capDo?: boolean
    chuDe?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["cauHoiGame"]>

  export type CauHoiGameSelectScalar = {
    id?: boolean
    noiDung?: boolean
    dapAn?: boolean
    capDo?: boolean
    chuDe?: boolean
    createdAt?: boolean
  }

  export type CauHoiGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "noiDung" | "dapAn" | "capDo" | "chuDe" | "createdAt", ExtArgs["result"]["cauHoiGame"]>
  export type CauHoiGameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lichSuChoiGames?: boolean | CauHoiGame$lichSuChoiGamesArgs<ExtArgs>
    _count?: boolean | CauHoiGameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CauHoiGameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CauHoiGameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CauHoiGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CauHoiGame"
    objects: {
      lichSuChoiGames: Prisma.$LichSuChoiGamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      noiDung: string
      dapAn: string
      capDo: string | null
      chuDe: string | null
      createdAt: Date
    }, ExtArgs["result"]["cauHoiGame"]>
    composites: {}
  }

  type CauHoiGameGetPayload<S extends boolean | null | undefined | CauHoiGameDefaultArgs> = $Result.GetResult<Prisma.$CauHoiGamePayload, S>

  type CauHoiGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CauHoiGameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CauHoiGameCountAggregateInputType | true
    }

  export interface CauHoiGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CauHoiGame'], meta: { name: 'CauHoiGame' } }
    /**
     * Find zero or one CauHoiGame that matches the filter.
     * @param {CauHoiGameFindUniqueArgs} args - Arguments to find a CauHoiGame
     * @example
     * // Get one CauHoiGame
     * const cauHoiGame = await prisma.cauHoiGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CauHoiGameFindUniqueArgs>(args: SelectSubset<T, CauHoiGameFindUniqueArgs<ExtArgs>>): Prisma__CauHoiGameClient<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CauHoiGame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CauHoiGameFindUniqueOrThrowArgs} args - Arguments to find a CauHoiGame
     * @example
     * // Get one CauHoiGame
     * const cauHoiGame = await prisma.cauHoiGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CauHoiGameFindUniqueOrThrowArgs>(args: SelectSubset<T, CauHoiGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CauHoiGameClient<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CauHoiGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CauHoiGameFindFirstArgs} args - Arguments to find a CauHoiGame
     * @example
     * // Get one CauHoiGame
     * const cauHoiGame = await prisma.cauHoiGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CauHoiGameFindFirstArgs>(args?: SelectSubset<T, CauHoiGameFindFirstArgs<ExtArgs>>): Prisma__CauHoiGameClient<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CauHoiGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CauHoiGameFindFirstOrThrowArgs} args - Arguments to find a CauHoiGame
     * @example
     * // Get one CauHoiGame
     * const cauHoiGame = await prisma.cauHoiGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CauHoiGameFindFirstOrThrowArgs>(args?: SelectSubset<T, CauHoiGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__CauHoiGameClient<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CauHoiGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CauHoiGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CauHoiGames
     * const cauHoiGames = await prisma.cauHoiGame.findMany()
     * 
     * // Get first 10 CauHoiGames
     * const cauHoiGames = await prisma.cauHoiGame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cauHoiGameWithIdOnly = await prisma.cauHoiGame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CauHoiGameFindManyArgs>(args?: SelectSubset<T, CauHoiGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CauHoiGame.
     * @param {CauHoiGameCreateArgs} args - Arguments to create a CauHoiGame.
     * @example
     * // Create one CauHoiGame
     * const CauHoiGame = await prisma.cauHoiGame.create({
     *   data: {
     *     // ... data to create a CauHoiGame
     *   }
     * })
     * 
     */
    create<T extends CauHoiGameCreateArgs>(args: SelectSubset<T, CauHoiGameCreateArgs<ExtArgs>>): Prisma__CauHoiGameClient<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CauHoiGames.
     * @param {CauHoiGameCreateManyArgs} args - Arguments to create many CauHoiGames.
     * @example
     * // Create many CauHoiGames
     * const cauHoiGame = await prisma.cauHoiGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CauHoiGameCreateManyArgs>(args?: SelectSubset<T, CauHoiGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CauHoiGames and returns the data saved in the database.
     * @param {CauHoiGameCreateManyAndReturnArgs} args - Arguments to create many CauHoiGames.
     * @example
     * // Create many CauHoiGames
     * const cauHoiGame = await prisma.cauHoiGame.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CauHoiGames and only return the `id`
     * const cauHoiGameWithIdOnly = await prisma.cauHoiGame.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CauHoiGameCreateManyAndReturnArgs>(args?: SelectSubset<T, CauHoiGameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CauHoiGame.
     * @param {CauHoiGameDeleteArgs} args - Arguments to delete one CauHoiGame.
     * @example
     * // Delete one CauHoiGame
     * const CauHoiGame = await prisma.cauHoiGame.delete({
     *   where: {
     *     // ... filter to delete one CauHoiGame
     *   }
     * })
     * 
     */
    delete<T extends CauHoiGameDeleteArgs>(args: SelectSubset<T, CauHoiGameDeleteArgs<ExtArgs>>): Prisma__CauHoiGameClient<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CauHoiGame.
     * @param {CauHoiGameUpdateArgs} args - Arguments to update one CauHoiGame.
     * @example
     * // Update one CauHoiGame
     * const cauHoiGame = await prisma.cauHoiGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CauHoiGameUpdateArgs>(args: SelectSubset<T, CauHoiGameUpdateArgs<ExtArgs>>): Prisma__CauHoiGameClient<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CauHoiGames.
     * @param {CauHoiGameDeleteManyArgs} args - Arguments to filter CauHoiGames to delete.
     * @example
     * // Delete a few CauHoiGames
     * const { count } = await prisma.cauHoiGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CauHoiGameDeleteManyArgs>(args?: SelectSubset<T, CauHoiGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CauHoiGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CauHoiGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CauHoiGames
     * const cauHoiGame = await prisma.cauHoiGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CauHoiGameUpdateManyArgs>(args: SelectSubset<T, CauHoiGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CauHoiGames and returns the data updated in the database.
     * @param {CauHoiGameUpdateManyAndReturnArgs} args - Arguments to update many CauHoiGames.
     * @example
     * // Update many CauHoiGames
     * const cauHoiGame = await prisma.cauHoiGame.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CauHoiGames and only return the `id`
     * const cauHoiGameWithIdOnly = await prisma.cauHoiGame.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CauHoiGameUpdateManyAndReturnArgs>(args: SelectSubset<T, CauHoiGameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CauHoiGame.
     * @param {CauHoiGameUpsertArgs} args - Arguments to update or create a CauHoiGame.
     * @example
     * // Update or create a CauHoiGame
     * const cauHoiGame = await prisma.cauHoiGame.upsert({
     *   create: {
     *     // ... data to create a CauHoiGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CauHoiGame we want to update
     *   }
     * })
     */
    upsert<T extends CauHoiGameUpsertArgs>(args: SelectSubset<T, CauHoiGameUpsertArgs<ExtArgs>>): Prisma__CauHoiGameClient<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CauHoiGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CauHoiGameCountArgs} args - Arguments to filter CauHoiGames to count.
     * @example
     * // Count the number of CauHoiGames
     * const count = await prisma.cauHoiGame.count({
     *   where: {
     *     // ... the filter for the CauHoiGames we want to count
     *   }
     * })
    **/
    count<T extends CauHoiGameCountArgs>(
      args?: Subset<T, CauHoiGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CauHoiGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CauHoiGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CauHoiGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CauHoiGameAggregateArgs>(args: Subset<T, CauHoiGameAggregateArgs>): Prisma.PrismaPromise<GetCauHoiGameAggregateType<T>>

    /**
     * Group by CauHoiGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CauHoiGameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CauHoiGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CauHoiGameGroupByArgs['orderBy'] }
        : { orderBy?: CauHoiGameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CauHoiGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCauHoiGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CauHoiGame model
   */
  readonly fields: CauHoiGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CauHoiGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CauHoiGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lichSuChoiGames<T extends CauHoiGame$lichSuChoiGamesArgs<ExtArgs> = {}>(args?: Subset<T, CauHoiGame$lichSuChoiGamesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CauHoiGame model
   */
  interface CauHoiGameFieldRefs {
    readonly id: FieldRef<"CauHoiGame", 'Int'>
    readonly noiDung: FieldRef<"CauHoiGame", 'String'>
    readonly dapAn: FieldRef<"CauHoiGame", 'String'>
    readonly capDo: FieldRef<"CauHoiGame", 'String'>
    readonly chuDe: FieldRef<"CauHoiGame", 'String'>
    readonly createdAt: FieldRef<"CauHoiGame", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CauHoiGame findUnique
   */
  export type CauHoiGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CauHoiGameInclude<ExtArgs> | null
    /**
     * Filter, which CauHoiGame to fetch.
     */
    where: CauHoiGameWhereUniqueInput
  }

  /**
   * CauHoiGame findUniqueOrThrow
   */
  export type CauHoiGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CauHoiGameInclude<ExtArgs> | null
    /**
     * Filter, which CauHoiGame to fetch.
     */
    where: CauHoiGameWhereUniqueInput
  }

  /**
   * CauHoiGame findFirst
   */
  export type CauHoiGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CauHoiGameInclude<ExtArgs> | null
    /**
     * Filter, which CauHoiGame to fetch.
     */
    where?: CauHoiGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CauHoiGames to fetch.
     */
    orderBy?: CauHoiGameOrderByWithRelationInput | CauHoiGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CauHoiGames.
     */
    cursor?: CauHoiGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CauHoiGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CauHoiGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CauHoiGames.
     */
    distinct?: CauHoiGameScalarFieldEnum | CauHoiGameScalarFieldEnum[]
  }

  /**
   * CauHoiGame findFirstOrThrow
   */
  export type CauHoiGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CauHoiGameInclude<ExtArgs> | null
    /**
     * Filter, which CauHoiGame to fetch.
     */
    where?: CauHoiGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CauHoiGames to fetch.
     */
    orderBy?: CauHoiGameOrderByWithRelationInput | CauHoiGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CauHoiGames.
     */
    cursor?: CauHoiGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CauHoiGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CauHoiGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CauHoiGames.
     */
    distinct?: CauHoiGameScalarFieldEnum | CauHoiGameScalarFieldEnum[]
  }

  /**
   * CauHoiGame findMany
   */
  export type CauHoiGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CauHoiGameInclude<ExtArgs> | null
    /**
     * Filter, which CauHoiGames to fetch.
     */
    where?: CauHoiGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CauHoiGames to fetch.
     */
    orderBy?: CauHoiGameOrderByWithRelationInput | CauHoiGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CauHoiGames.
     */
    cursor?: CauHoiGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CauHoiGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CauHoiGames.
     */
    skip?: number
    distinct?: CauHoiGameScalarFieldEnum | CauHoiGameScalarFieldEnum[]
  }

  /**
   * CauHoiGame create
   */
  export type CauHoiGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CauHoiGameInclude<ExtArgs> | null
    /**
     * The data needed to create a CauHoiGame.
     */
    data: XOR<CauHoiGameCreateInput, CauHoiGameUncheckedCreateInput>
  }

  /**
   * CauHoiGame createMany
   */
  export type CauHoiGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CauHoiGames.
     */
    data: CauHoiGameCreateManyInput | CauHoiGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CauHoiGame createManyAndReturn
   */
  export type CauHoiGameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * The data used to create many CauHoiGames.
     */
    data: CauHoiGameCreateManyInput | CauHoiGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CauHoiGame update
   */
  export type CauHoiGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CauHoiGameInclude<ExtArgs> | null
    /**
     * The data needed to update a CauHoiGame.
     */
    data: XOR<CauHoiGameUpdateInput, CauHoiGameUncheckedUpdateInput>
    /**
     * Choose, which CauHoiGame to update.
     */
    where: CauHoiGameWhereUniqueInput
  }

  /**
   * CauHoiGame updateMany
   */
  export type CauHoiGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CauHoiGames.
     */
    data: XOR<CauHoiGameUpdateManyMutationInput, CauHoiGameUncheckedUpdateManyInput>
    /**
     * Filter which CauHoiGames to update
     */
    where?: CauHoiGameWhereInput
    /**
     * Limit how many CauHoiGames to update.
     */
    limit?: number
  }

  /**
   * CauHoiGame updateManyAndReturn
   */
  export type CauHoiGameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * The data used to update CauHoiGames.
     */
    data: XOR<CauHoiGameUpdateManyMutationInput, CauHoiGameUncheckedUpdateManyInput>
    /**
     * Filter which CauHoiGames to update
     */
    where?: CauHoiGameWhereInput
    /**
     * Limit how many CauHoiGames to update.
     */
    limit?: number
  }

  /**
   * CauHoiGame upsert
   */
  export type CauHoiGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CauHoiGameInclude<ExtArgs> | null
    /**
     * The filter to search for the CauHoiGame to update in case it exists.
     */
    where: CauHoiGameWhereUniqueInput
    /**
     * In case the CauHoiGame found by the `where` argument doesn't exist, create a new CauHoiGame with this data.
     */
    create: XOR<CauHoiGameCreateInput, CauHoiGameUncheckedCreateInput>
    /**
     * In case the CauHoiGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CauHoiGameUpdateInput, CauHoiGameUncheckedUpdateInput>
  }

  /**
   * CauHoiGame delete
   */
  export type CauHoiGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CauHoiGameInclude<ExtArgs> | null
    /**
     * Filter which CauHoiGame to delete.
     */
    where: CauHoiGameWhereUniqueInput
  }

  /**
   * CauHoiGame deleteMany
   */
  export type CauHoiGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CauHoiGames to delete
     */
    where?: CauHoiGameWhereInput
    /**
     * Limit how many CauHoiGames to delete.
     */
    limit?: number
  }

  /**
   * CauHoiGame.lichSuChoiGames
   */
  export type CauHoiGame$lichSuChoiGamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    where?: LichSuChoiGameWhereInput
    orderBy?: LichSuChoiGameOrderByWithRelationInput | LichSuChoiGameOrderByWithRelationInput[]
    cursor?: LichSuChoiGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LichSuChoiGameScalarFieldEnum | LichSuChoiGameScalarFieldEnum[]
  }

  /**
   * CauHoiGame without action
   */
  export type CauHoiGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CauHoiGame
     */
    select?: CauHoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CauHoiGame
     */
    omit?: CauHoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CauHoiGameInclude<ExtArgs> | null
  }


  /**
   * Model LichSuChoiGame
   */

  export type AggregateLichSuChoiGame = {
    _count: LichSuChoiGameCountAggregateOutputType | null
    _avg: LichSuChoiGameAvgAggregateOutputType | null
    _sum: LichSuChoiGameSumAggregateOutputType | null
    _min: LichSuChoiGameMinAggregateOutputType | null
    _max: LichSuChoiGameMaxAggregateOutputType | null
  }

  export type LichSuChoiGameAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    cauHoiId: number | null
    thoiGianTraLoi: number | null
  }

  export type LichSuChoiGameSumAggregateOutputType = {
    id: number | null
    userId: number | null
    cauHoiId: number | null
    thoiGianTraLoi: number | null
  }

  export type LichSuChoiGameMinAggregateOutputType = {
    id: number | null
    userId: number | null
    cauHoiId: number | null
    dapAnNguoiDung: string | null
    dung: boolean | null
    thoiGianTraLoi: number | null
    thoiGian: Date | null
  }

  export type LichSuChoiGameMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    cauHoiId: number | null
    dapAnNguoiDung: string | null
    dung: boolean | null
    thoiGianTraLoi: number | null
    thoiGian: Date | null
  }

  export type LichSuChoiGameCountAggregateOutputType = {
    id: number
    userId: number
    cauHoiId: number
    dapAnNguoiDung: number
    dung: number
    thoiGianTraLoi: number
    thoiGian: number
    _all: number
  }


  export type LichSuChoiGameAvgAggregateInputType = {
    id?: true
    userId?: true
    cauHoiId?: true
    thoiGianTraLoi?: true
  }

  export type LichSuChoiGameSumAggregateInputType = {
    id?: true
    userId?: true
    cauHoiId?: true
    thoiGianTraLoi?: true
  }

  export type LichSuChoiGameMinAggregateInputType = {
    id?: true
    userId?: true
    cauHoiId?: true
    dapAnNguoiDung?: true
    dung?: true
    thoiGianTraLoi?: true
    thoiGian?: true
  }

  export type LichSuChoiGameMaxAggregateInputType = {
    id?: true
    userId?: true
    cauHoiId?: true
    dapAnNguoiDung?: true
    dung?: true
    thoiGianTraLoi?: true
    thoiGian?: true
  }

  export type LichSuChoiGameCountAggregateInputType = {
    id?: true
    userId?: true
    cauHoiId?: true
    dapAnNguoiDung?: true
    dung?: true
    thoiGianTraLoi?: true
    thoiGian?: true
    _all?: true
  }

  export type LichSuChoiGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LichSuChoiGame to aggregate.
     */
    where?: LichSuChoiGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LichSuChoiGames to fetch.
     */
    orderBy?: LichSuChoiGameOrderByWithRelationInput | LichSuChoiGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LichSuChoiGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LichSuChoiGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LichSuChoiGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LichSuChoiGames
    **/
    _count?: true | LichSuChoiGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LichSuChoiGameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LichSuChoiGameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LichSuChoiGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LichSuChoiGameMaxAggregateInputType
  }

  export type GetLichSuChoiGameAggregateType<T extends LichSuChoiGameAggregateArgs> = {
        [P in keyof T & keyof AggregateLichSuChoiGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLichSuChoiGame[P]>
      : GetScalarType<T[P], AggregateLichSuChoiGame[P]>
  }




  export type LichSuChoiGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LichSuChoiGameWhereInput
    orderBy?: LichSuChoiGameOrderByWithAggregationInput | LichSuChoiGameOrderByWithAggregationInput[]
    by: LichSuChoiGameScalarFieldEnum[] | LichSuChoiGameScalarFieldEnum
    having?: LichSuChoiGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LichSuChoiGameCountAggregateInputType | true
    _avg?: LichSuChoiGameAvgAggregateInputType
    _sum?: LichSuChoiGameSumAggregateInputType
    _min?: LichSuChoiGameMinAggregateInputType
    _max?: LichSuChoiGameMaxAggregateInputType
  }

  export type LichSuChoiGameGroupByOutputType = {
    id: number
    userId: number
    cauHoiId: number
    dapAnNguoiDung: string
    dung: boolean
    thoiGianTraLoi: number
    thoiGian: Date
    _count: LichSuChoiGameCountAggregateOutputType | null
    _avg: LichSuChoiGameAvgAggregateOutputType | null
    _sum: LichSuChoiGameSumAggregateOutputType | null
    _min: LichSuChoiGameMinAggregateOutputType | null
    _max: LichSuChoiGameMaxAggregateOutputType | null
  }

  type GetLichSuChoiGameGroupByPayload<T extends LichSuChoiGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LichSuChoiGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LichSuChoiGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LichSuChoiGameGroupByOutputType[P]>
            : GetScalarType<T[P], LichSuChoiGameGroupByOutputType[P]>
        }
      >
    >


  export type LichSuChoiGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cauHoiId?: boolean
    dapAnNguoiDung?: boolean
    dung?: boolean
    thoiGianTraLoi?: boolean
    thoiGian?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    cauHoiGame?: boolean | CauHoiGameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lichSuChoiGame"]>

  export type LichSuChoiGameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cauHoiId?: boolean
    dapAnNguoiDung?: boolean
    dung?: boolean
    thoiGianTraLoi?: boolean
    thoiGian?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    cauHoiGame?: boolean | CauHoiGameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lichSuChoiGame"]>

  export type LichSuChoiGameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cauHoiId?: boolean
    dapAnNguoiDung?: boolean
    dung?: boolean
    thoiGianTraLoi?: boolean
    thoiGian?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    cauHoiGame?: boolean | CauHoiGameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lichSuChoiGame"]>

  export type LichSuChoiGameSelectScalar = {
    id?: boolean
    userId?: boolean
    cauHoiId?: boolean
    dapAnNguoiDung?: boolean
    dung?: boolean
    thoiGianTraLoi?: boolean
    thoiGian?: boolean
  }

  export type LichSuChoiGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "cauHoiId" | "dapAnNguoiDung" | "dung" | "thoiGianTraLoi" | "thoiGian", ExtArgs["result"]["lichSuChoiGame"]>
  export type LichSuChoiGameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    cauHoiGame?: boolean | CauHoiGameDefaultArgs<ExtArgs>
  }
  export type LichSuChoiGameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    cauHoiGame?: boolean | CauHoiGameDefaultArgs<ExtArgs>
  }
  export type LichSuChoiGameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    cauHoiGame?: boolean | CauHoiGameDefaultArgs<ExtArgs>
  }

  export type $LichSuChoiGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LichSuChoiGame"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      cauHoiGame: Prisma.$CauHoiGamePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      cauHoiId: number
      dapAnNguoiDung: string
      dung: boolean
      thoiGianTraLoi: number
      thoiGian: Date
    }, ExtArgs["result"]["lichSuChoiGame"]>
    composites: {}
  }

  type LichSuChoiGameGetPayload<S extends boolean | null | undefined | LichSuChoiGameDefaultArgs> = $Result.GetResult<Prisma.$LichSuChoiGamePayload, S>

  type LichSuChoiGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LichSuChoiGameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LichSuChoiGameCountAggregateInputType | true
    }

  export interface LichSuChoiGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LichSuChoiGame'], meta: { name: 'LichSuChoiGame' } }
    /**
     * Find zero or one LichSuChoiGame that matches the filter.
     * @param {LichSuChoiGameFindUniqueArgs} args - Arguments to find a LichSuChoiGame
     * @example
     * // Get one LichSuChoiGame
     * const lichSuChoiGame = await prisma.lichSuChoiGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LichSuChoiGameFindUniqueArgs>(args: SelectSubset<T, LichSuChoiGameFindUniqueArgs<ExtArgs>>): Prisma__LichSuChoiGameClient<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LichSuChoiGame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LichSuChoiGameFindUniqueOrThrowArgs} args - Arguments to find a LichSuChoiGame
     * @example
     * // Get one LichSuChoiGame
     * const lichSuChoiGame = await prisma.lichSuChoiGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LichSuChoiGameFindUniqueOrThrowArgs>(args: SelectSubset<T, LichSuChoiGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LichSuChoiGameClient<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LichSuChoiGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LichSuChoiGameFindFirstArgs} args - Arguments to find a LichSuChoiGame
     * @example
     * // Get one LichSuChoiGame
     * const lichSuChoiGame = await prisma.lichSuChoiGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LichSuChoiGameFindFirstArgs>(args?: SelectSubset<T, LichSuChoiGameFindFirstArgs<ExtArgs>>): Prisma__LichSuChoiGameClient<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LichSuChoiGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LichSuChoiGameFindFirstOrThrowArgs} args - Arguments to find a LichSuChoiGame
     * @example
     * // Get one LichSuChoiGame
     * const lichSuChoiGame = await prisma.lichSuChoiGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LichSuChoiGameFindFirstOrThrowArgs>(args?: SelectSubset<T, LichSuChoiGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__LichSuChoiGameClient<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LichSuChoiGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LichSuChoiGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LichSuChoiGames
     * const lichSuChoiGames = await prisma.lichSuChoiGame.findMany()
     * 
     * // Get first 10 LichSuChoiGames
     * const lichSuChoiGames = await prisma.lichSuChoiGame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lichSuChoiGameWithIdOnly = await prisma.lichSuChoiGame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LichSuChoiGameFindManyArgs>(args?: SelectSubset<T, LichSuChoiGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LichSuChoiGame.
     * @param {LichSuChoiGameCreateArgs} args - Arguments to create a LichSuChoiGame.
     * @example
     * // Create one LichSuChoiGame
     * const LichSuChoiGame = await prisma.lichSuChoiGame.create({
     *   data: {
     *     // ... data to create a LichSuChoiGame
     *   }
     * })
     * 
     */
    create<T extends LichSuChoiGameCreateArgs>(args: SelectSubset<T, LichSuChoiGameCreateArgs<ExtArgs>>): Prisma__LichSuChoiGameClient<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LichSuChoiGames.
     * @param {LichSuChoiGameCreateManyArgs} args - Arguments to create many LichSuChoiGames.
     * @example
     * // Create many LichSuChoiGames
     * const lichSuChoiGame = await prisma.lichSuChoiGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LichSuChoiGameCreateManyArgs>(args?: SelectSubset<T, LichSuChoiGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LichSuChoiGames and returns the data saved in the database.
     * @param {LichSuChoiGameCreateManyAndReturnArgs} args - Arguments to create many LichSuChoiGames.
     * @example
     * // Create many LichSuChoiGames
     * const lichSuChoiGame = await prisma.lichSuChoiGame.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LichSuChoiGames and only return the `id`
     * const lichSuChoiGameWithIdOnly = await prisma.lichSuChoiGame.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LichSuChoiGameCreateManyAndReturnArgs>(args?: SelectSubset<T, LichSuChoiGameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LichSuChoiGame.
     * @param {LichSuChoiGameDeleteArgs} args - Arguments to delete one LichSuChoiGame.
     * @example
     * // Delete one LichSuChoiGame
     * const LichSuChoiGame = await prisma.lichSuChoiGame.delete({
     *   where: {
     *     // ... filter to delete one LichSuChoiGame
     *   }
     * })
     * 
     */
    delete<T extends LichSuChoiGameDeleteArgs>(args: SelectSubset<T, LichSuChoiGameDeleteArgs<ExtArgs>>): Prisma__LichSuChoiGameClient<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LichSuChoiGame.
     * @param {LichSuChoiGameUpdateArgs} args - Arguments to update one LichSuChoiGame.
     * @example
     * // Update one LichSuChoiGame
     * const lichSuChoiGame = await prisma.lichSuChoiGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LichSuChoiGameUpdateArgs>(args: SelectSubset<T, LichSuChoiGameUpdateArgs<ExtArgs>>): Prisma__LichSuChoiGameClient<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LichSuChoiGames.
     * @param {LichSuChoiGameDeleteManyArgs} args - Arguments to filter LichSuChoiGames to delete.
     * @example
     * // Delete a few LichSuChoiGames
     * const { count } = await prisma.lichSuChoiGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LichSuChoiGameDeleteManyArgs>(args?: SelectSubset<T, LichSuChoiGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LichSuChoiGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LichSuChoiGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LichSuChoiGames
     * const lichSuChoiGame = await prisma.lichSuChoiGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LichSuChoiGameUpdateManyArgs>(args: SelectSubset<T, LichSuChoiGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LichSuChoiGames and returns the data updated in the database.
     * @param {LichSuChoiGameUpdateManyAndReturnArgs} args - Arguments to update many LichSuChoiGames.
     * @example
     * // Update many LichSuChoiGames
     * const lichSuChoiGame = await prisma.lichSuChoiGame.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LichSuChoiGames and only return the `id`
     * const lichSuChoiGameWithIdOnly = await prisma.lichSuChoiGame.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LichSuChoiGameUpdateManyAndReturnArgs>(args: SelectSubset<T, LichSuChoiGameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LichSuChoiGame.
     * @param {LichSuChoiGameUpsertArgs} args - Arguments to update or create a LichSuChoiGame.
     * @example
     * // Update or create a LichSuChoiGame
     * const lichSuChoiGame = await prisma.lichSuChoiGame.upsert({
     *   create: {
     *     // ... data to create a LichSuChoiGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LichSuChoiGame we want to update
     *   }
     * })
     */
    upsert<T extends LichSuChoiGameUpsertArgs>(args: SelectSubset<T, LichSuChoiGameUpsertArgs<ExtArgs>>): Prisma__LichSuChoiGameClient<$Result.GetResult<Prisma.$LichSuChoiGamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LichSuChoiGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LichSuChoiGameCountArgs} args - Arguments to filter LichSuChoiGames to count.
     * @example
     * // Count the number of LichSuChoiGames
     * const count = await prisma.lichSuChoiGame.count({
     *   where: {
     *     // ... the filter for the LichSuChoiGames we want to count
     *   }
     * })
    **/
    count<T extends LichSuChoiGameCountArgs>(
      args?: Subset<T, LichSuChoiGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LichSuChoiGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LichSuChoiGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LichSuChoiGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LichSuChoiGameAggregateArgs>(args: Subset<T, LichSuChoiGameAggregateArgs>): Prisma.PrismaPromise<GetLichSuChoiGameAggregateType<T>>

    /**
     * Group by LichSuChoiGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LichSuChoiGameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LichSuChoiGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LichSuChoiGameGroupByArgs['orderBy'] }
        : { orderBy?: LichSuChoiGameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LichSuChoiGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLichSuChoiGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LichSuChoiGame model
   */
  readonly fields: LichSuChoiGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LichSuChoiGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LichSuChoiGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cauHoiGame<T extends CauHoiGameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CauHoiGameDefaultArgs<ExtArgs>>): Prisma__CauHoiGameClient<$Result.GetResult<Prisma.$CauHoiGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LichSuChoiGame model
   */
  interface LichSuChoiGameFieldRefs {
    readonly id: FieldRef<"LichSuChoiGame", 'Int'>
    readonly userId: FieldRef<"LichSuChoiGame", 'Int'>
    readonly cauHoiId: FieldRef<"LichSuChoiGame", 'Int'>
    readonly dapAnNguoiDung: FieldRef<"LichSuChoiGame", 'String'>
    readonly dung: FieldRef<"LichSuChoiGame", 'Boolean'>
    readonly thoiGianTraLoi: FieldRef<"LichSuChoiGame", 'Int'>
    readonly thoiGian: FieldRef<"LichSuChoiGame", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LichSuChoiGame findUnique
   */
  export type LichSuChoiGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    /**
     * Filter, which LichSuChoiGame to fetch.
     */
    where: LichSuChoiGameWhereUniqueInput
  }

  /**
   * LichSuChoiGame findUniqueOrThrow
   */
  export type LichSuChoiGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    /**
     * Filter, which LichSuChoiGame to fetch.
     */
    where: LichSuChoiGameWhereUniqueInput
  }

  /**
   * LichSuChoiGame findFirst
   */
  export type LichSuChoiGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    /**
     * Filter, which LichSuChoiGame to fetch.
     */
    where?: LichSuChoiGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LichSuChoiGames to fetch.
     */
    orderBy?: LichSuChoiGameOrderByWithRelationInput | LichSuChoiGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LichSuChoiGames.
     */
    cursor?: LichSuChoiGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LichSuChoiGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LichSuChoiGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LichSuChoiGames.
     */
    distinct?: LichSuChoiGameScalarFieldEnum | LichSuChoiGameScalarFieldEnum[]
  }

  /**
   * LichSuChoiGame findFirstOrThrow
   */
  export type LichSuChoiGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    /**
     * Filter, which LichSuChoiGame to fetch.
     */
    where?: LichSuChoiGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LichSuChoiGames to fetch.
     */
    orderBy?: LichSuChoiGameOrderByWithRelationInput | LichSuChoiGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LichSuChoiGames.
     */
    cursor?: LichSuChoiGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LichSuChoiGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LichSuChoiGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LichSuChoiGames.
     */
    distinct?: LichSuChoiGameScalarFieldEnum | LichSuChoiGameScalarFieldEnum[]
  }

  /**
   * LichSuChoiGame findMany
   */
  export type LichSuChoiGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    /**
     * Filter, which LichSuChoiGames to fetch.
     */
    where?: LichSuChoiGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LichSuChoiGames to fetch.
     */
    orderBy?: LichSuChoiGameOrderByWithRelationInput | LichSuChoiGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LichSuChoiGames.
     */
    cursor?: LichSuChoiGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LichSuChoiGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LichSuChoiGames.
     */
    skip?: number
    distinct?: LichSuChoiGameScalarFieldEnum | LichSuChoiGameScalarFieldEnum[]
  }

  /**
   * LichSuChoiGame create
   */
  export type LichSuChoiGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    /**
     * The data needed to create a LichSuChoiGame.
     */
    data: XOR<LichSuChoiGameCreateInput, LichSuChoiGameUncheckedCreateInput>
  }

  /**
   * LichSuChoiGame createMany
   */
  export type LichSuChoiGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LichSuChoiGames.
     */
    data: LichSuChoiGameCreateManyInput | LichSuChoiGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LichSuChoiGame createManyAndReturn
   */
  export type LichSuChoiGameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * The data used to create many LichSuChoiGames.
     */
    data: LichSuChoiGameCreateManyInput | LichSuChoiGameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LichSuChoiGame update
   */
  export type LichSuChoiGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    /**
     * The data needed to update a LichSuChoiGame.
     */
    data: XOR<LichSuChoiGameUpdateInput, LichSuChoiGameUncheckedUpdateInput>
    /**
     * Choose, which LichSuChoiGame to update.
     */
    where: LichSuChoiGameWhereUniqueInput
  }

  /**
   * LichSuChoiGame updateMany
   */
  export type LichSuChoiGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LichSuChoiGames.
     */
    data: XOR<LichSuChoiGameUpdateManyMutationInput, LichSuChoiGameUncheckedUpdateManyInput>
    /**
     * Filter which LichSuChoiGames to update
     */
    where?: LichSuChoiGameWhereInput
    /**
     * Limit how many LichSuChoiGames to update.
     */
    limit?: number
  }

  /**
   * LichSuChoiGame updateManyAndReturn
   */
  export type LichSuChoiGameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * The data used to update LichSuChoiGames.
     */
    data: XOR<LichSuChoiGameUpdateManyMutationInput, LichSuChoiGameUncheckedUpdateManyInput>
    /**
     * Filter which LichSuChoiGames to update
     */
    where?: LichSuChoiGameWhereInput
    /**
     * Limit how many LichSuChoiGames to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LichSuChoiGame upsert
   */
  export type LichSuChoiGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    /**
     * The filter to search for the LichSuChoiGame to update in case it exists.
     */
    where: LichSuChoiGameWhereUniqueInput
    /**
     * In case the LichSuChoiGame found by the `where` argument doesn't exist, create a new LichSuChoiGame with this data.
     */
    create: XOR<LichSuChoiGameCreateInput, LichSuChoiGameUncheckedCreateInput>
    /**
     * In case the LichSuChoiGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LichSuChoiGameUpdateInput, LichSuChoiGameUncheckedUpdateInput>
  }

  /**
   * LichSuChoiGame delete
   */
  export type LichSuChoiGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
    /**
     * Filter which LichSuChoiGame to delete.
     */
    where: LichSuChoiGameWhereUniqueInput
  }

  /**
   * LichSuChoiGame deleteMany
   */
  export type LichSuChoiGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LichSuChoiGames to delete
     */
    where?: LichSuChoiGameWhereInput
    /**
     * Limit how many LichSuChoiGames to delete.
     */
    limit?: number
  }

  /**
   * LichSuChoiGame without action
   */
  export type LichSuChoiGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LichSuChoiGame
     */
    select?: LichSuChoiGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LichSuChoiGame
     */
    omit?: LichSuChoiGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LichSuChoiGameInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const KhoaHocScalarFieldEnum: {
    KhoaHocId: 'KhoaHocId',
    TenKhoaHoc: 'TenKhoaHoc',
    MoTa: 'MoTa',
    Gia: 'Gia',
    VideoUrl: 'VideoUrl',
    HinhAnh: 'HinhAnh'
  };

  export type KhoaHocScalarFieldEnum = (typeof KhoaHocScalarFieldEnum)[keyof typeof KhoaHocScalarFieldEnum]


  export const BaiHocScalarFieldEnum: {
    BaiHocId: 'BaiHocId',
    TieuDe: 'TieuDe',
    NoiDung: 'NoiDung',
    VideoUrl: 'VideoUrl',
    HinhAnh: 'HinhAnh',
    KhoaHocId: 'KhoaHocId'
  };

  export type BaiHocScalarFieldEnum = (typeof BaiHocScalarFieldEnum)[keyof typeof BaiHocScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    fullname: 'fullname',
    sex: 'sex',
    phonenumber: 'phonenumber',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const UserRoleScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    roleId: 'roleId'
  };

  export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum]


  export const RoleClaimScalarFieldEnum: {
    id: 'id',
    roleId: 'roleId',
    claim: 'claim'
  };

  export type RoleClaimScalarFieldEnum = (typeof RoleClaimScalarFieldEnum)[keyof typeof RoleClaimScalarFieldEnum]


  export const CT_NguoiDung_KhoaHocScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    khoaHocId: 'khoaHocId',
    ngayCapNhat: 'ngayCapNhat'
  };

  export type CT_NguoiDung_KhoaHocScalarFieldEnum = (typeof CT_NguoiDung_KhoaHocScalarFieldEnum)[keyof typeof CT_NguoiDung_KhoaHocScalarFieldEnum]


  export const CT_NguoiDung_BaiHocScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    baiHocId: 'baiHocId',
    ngayCapNhat: 'ngayCapNhat'
  };

  export type CT_NguoiDung_BaiHocScalarFieldEnum = (typeof CT_NguoiDung_BaiHocScalarFieldEnum)[keyof typeof CT_NguoiDung_BaiHocScalarFieldEnum]


  export const CauHoiGameScalarFieldEnum: {
    id: 'id',
    noiDung: 'noiDung',
    dapAn: 'dapAn',
    capDo: 'capDo',
    chuDe: 'chuDe',
    createdAt: 'createdAt'
  };

  export type CauHoiGameScalarFieldEnum = (typeof CauHoiGameScalarFieldEnum)[keyof typeof CauHoiGameScalarFieldEnum]


  export const LichSuChoiGameScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    cauHoiId: 'cauHoiId',
    dapAnNguoiDung: 'dapAnNguoiDung',
    dung: 'dung',
    thoiGianTraLoi: 'thoiGianTraLoi',
    thoiGian: 'thoiGian'
  };

  export type LichSuChoiGameScalarFieldEnum = (typeof LichSuChoiGameScalarFieldEnum)[keyof typeof LichSuChoiGameScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type KhoaHocWhereInput = {
    AND?: KhoaHocWhereInput | KhoaHocWhereInput[]
    OR?: KhoaHocWhereInput[]
    NOT?: KhoaHocWhereInput | KhoaHocWhereInput[]
    KhoaHocId?: IntFilter<"KhoaHoc"> | number
    TenKhoaHoc?: StringFilter<"KhoaHoc"> | string
    MoTa?: StringNullableFilter<"KhoaHoc"> | string | null
    Gia?: FloatFilter<"KhoaHoc"> | number
    VideoUrl?: StringNullableFilter<"KhoaHoc"> | string | null
    HinhAnh?: StringNullableFilter<"KhoaHoc"> | string | null
    baiHocs?: BaiHocListRelationFilter
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocListRelationFilter
  }

  export type KhoaHocOrderByWithRelationInput = {
    KhoaHocId?: SortOrder
    TenKhoaHoc?: SortOrder
    MoTa?: SortOrderInput | SortOrder
    Gia?: SortOrder
    VideoUrl?: SortOrderInput | SortOrder
    HinhAnh?: SortOrderInput | SortOrder
    baiHocs?: BaiHocOrderByRelationAggregateInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocOrderByRelationAggregateInput
  }

  export type KhoaHocWhereUniqueInput = Prisma.AtLeast<{
    KhoaHocId?: number
    AND?: KhoaHocWhereInput | KhoaHocWhereInput[]
    OR?: KhoaHocWhereInput[]
    NOT?: KhoaHocWhereInput | KhoaHocWhereInput[]
    TenKhoaHoc?: StringFilter<"KhoaHoc"> | string
    MoTa?: StringNullableFilter<"KhoaHoc"> | string | null
    Gia?: FloatFilter<"KhoaHoc"> | number
    VideoUrl?: StringNullableFilter<"KhoaHoc"> | string | null
    HinhAnh?: StringNullableFilter<"KhoaHoc"> | string | null
    baiHocs?: BaiHocListRelationFilter
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocListRelationFilter
  }, "KhoaHocId">

  export type KhoaHocOrderByWithAggregationInput = {
    KhoaHocId?: SortOrder
    TenKhoaHoc?: SortOrder
    MoTa?: SortOrderInput | SortOrder
    Gia?: SortOrder
    VideoUrl?: SortOrderInput | SortOrder
    HinhAnh?: SortOrderInput | SortOrder
    _count?: KhoaHocCountOrderByAggregateInput
    _avg?: KhoaHocAvgOrderByAggregateInput
    _max?: KhoaHocMaxOrderByAggregateInput
    _min?: KhoaHocMinOrderByAggregateInput
    _sum?: KhoaHocSumOrderByAggregateInput
  }

  export type KhoaHocScalarWhereWithAggregatesInput = {
    AND?: KhoaHocScalarWhereWithAggregatesInput | KhoaHocScalarWhereWithAggregatesInput[]
    OR?: KhoaHocScalarWhereWithAggregatesInput[]
    NOT?: KhoaHocScalarWhereWithAggregatesInput | KhoaHocScalarWhereWithAggregatesInput[]
    KhoaHocId?: IntWithAggregatesFilter<"KhoaHoc"> | number
    TenKhoaHoc?: StringWithAggregatesFilter<"KhoaHoc"> | string
    MoTa?: StringNullableWithAggregatesFilter<"KhoaHoc"> | string | null
    Gia?: FloatWithAggregatesFilter<"KhoaHoc"> | number
    VideoUrl?: StringNullableWithAggregatesFilter<"KhoaHoc"> | string | null
    HinhAnh?: StringNullableWithAggregatesFilter<"KhoaHoc"> | string | null
  }

  export type BaiHocWhereInput = {
    AND?: BaiHocWhereInput | BaiHocWhereInput[]
    OR?: BaiHocWhereInput[]
    NOT?: BaiHocWhereInput | BaiHocWhereInput[]
    BaiHocId?: IntFilter<"BaiHoc"> | number
    TieuDe?: StringFilter<"BaiHoc"> | string
    NoiDung?: StringNullableFilter<"BaiHoc"> | string | null
    VideoUrl?: StringNullableFilter<"BaiHoc"> | string | null
    HinhAnh?: StringNullableFilter<"BaiHoc"> | string | null
    KhoaHocId?: IntFilter<"BaiHoc"> | number
    KhoaHoc?: XOR<KhoaHocScalarRelationFilter, KhoaHocWhereInput>
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocListRelationFilter
  }

  export type BaiHocOrderByWithRelationInput = {
    BaiHocId?: SortOrder
    TieuDe?: SortOrder
    NoiDung?: SortOrderInput | SortOrder
    VideoUrl?: SortOrderInput | SortOrder
    HinhAnh?: SortOrderInput | SortOrder
    KhoaHocId?: SortOrder
    KhoaHoc?: KhoaHocOrderByWithRelationInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocOrderByRelationAggregateInput
  }

  export type BaiHocWhereUniqueInput = Prisma.AtLeast<{
    BaiHocId?: number
    AND?: BaiHocWhereInput | BaiHocWhereInput[]
    OR?: BaiHocWhereInput[]
    NOT?: BaiHocWhereInput | BaiHocWhereInput[]
    TieuDe?: StringFilter<"BaiHoc"> | string
    NoiDung?: StringNullableFilter<"BaiHoc"> | string | null
    VideoUrl?: StringNullableFilter<"BaiHoc"> | string | null
    HinhAnh?: StringNullableFilter<"BaiHoc"> | string | null
    KhoaHocId?: IntFilter<"BaiHoc"> | number
    KhoaHoc?: XOR<KhoaHocScalarRelationFilter, KhoaHocWhereInput>
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocListRelationFilter
  }, "BaiHocId">

  export type BaiHocOrderByWithAggregationInput = {
    BaiHocId?: SortOrder
    TieuDe?: SortOrder
    NoiDung?: SortOrderInput | SortOrder
    VideoUrl?: SortOrderInput | SortOrder
    HinhAnh?: SortOrderInput | SortOrder
    KhoaHocId?: SortOrder
    _count?: BaiHocCountOrderByAggregateInput
    _avg?: BaiHocAvgOrderByAggregateInput
    _max?: BaiHocMaxOrderByAggregateInput
    _min?: BaiHocMinOrderByAggregateInput
    _sum?: BaiHocSumOrderByAggregateInput
  }

  export type BaiHocScalarWhereWithAggregatesInput = {
    AND?: BaiHocScalarWhereWithAggregatesInput | BaiHocScalarWhereWithAggregatesInput[]
    OR?: BaiHocScalarWhereWithAggregatesInput[]
    NOT?: BaiHocScalarWhereWithAggregatesInput | BaiHocScalarWhereWithAggregatesInput[]
    BaiHocId?: IntWithAggregatesFilter<"BaiHoc"> | number
    TieuDe?: StringWithAggregatesFilter<"BaiHoc"> | string
    NoiDung?: StringNullableWithAggregatesFilter<"BaiHoc"> | string | null
    VideoUrl?: StringNullableWithAggregatesFilter<"BaiHoc"> | string | null
    HinhAnh?: StringNullableWithAggregatesFilter<"BaiHoc"> | string | null
    KhoaHocId?: IntWithAggregatesFilter<"BaiHoc"> | number
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    fullname?: StringFilter<"User"> | string
    sex?: StringFilter<"User"> | string
    phonenumber?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    roles?: UserRoleListRelationFilter
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocListRelationFilter
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocListRelationFilter
    lichSuChoiGames?: LichSuChoiGameListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    fullname?: SortOrder
    sex?: SortOrder
    phonenumber?: SortOrder
    password?: SortOrder
    roles?: UserRoleOrderByRelationAggregateInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocOrderByRelationAggregateInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocOrderByRelationAggregateInput
    lichSuChoiGames?: LichSuChoiGameOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullname?: StringFilter<"User"> | string
    sex?: StringFilter<"User"> | string
    phonenumber?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    roles?: UserRoleListRelationFilter
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocListRelationFilter
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocListRelationFilter
    lichSuChoiGames?: LichSuChoiGameListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    fullname?: SortOrder
    sex?: SortOrder
    phonenumber?: SortOrder
    password?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    fullname?: StringWithAggregatesFilter<"User"> | string
    sex?: StringWithAggregatesFilter<"User"> | string
    phonenumber?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: IntFilter<"Role"> | number
    name?: StringFilter<"Role"> | string
    claims?: RoleClaimListRelationFilter
    users?: UserRoleListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    claims?: RoleClaimOrderByRelationAggregateInput
    users?: UserRoleOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    claims?: RoleClaimListRelationFilter
    users?: UserRoleListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _avg?: RoleAvgOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
    _sum?: RoleSumOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Role"> | number
    name?: StringWithAggregatesFilter<"Role"> | string
  }

  export type UserRoleWhereInput = {
    AND?: UserRoleWhereInput | UserRoleWhereInput[]
    OR?: UserRoleWhereInput[]
    NOT?: UserRoleWhereInput | UserRoleWhereInput[]
    id?: IntFilter<"UserRole"> | number
    userId?: IntFilter<"UserRole"> | number
    roleId?: IntFilter<"UserRole"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }

  export type UserRoleOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    user?: UserOrderByWithRelationInput
    role?: RoleOrderByWithRelationInput
  }

  export type UserRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_roleId?: UserRoleUserIdRoleIdCompoundUniqueInput
    AND?: UserRoleWhereInput | UserRoleWhereInput[]
    OR?: UserRoleWhereInput[]
    NOT?: UserRoleWhereInput | UserRoleWhereInput[]
    userId?: IntFilter<"UserRole"> | number
    roleId?: IntFilter<"UserRole"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }, "id" | "userId_roleId">

  export type UserRoleOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    _count?: UserRoleCountOrderByAggregateInput
    _avg?: UserRoleAvgOrderByAggregateInput
    _max?: UserRoleMaxOrderByAggregateInput
    _min?: UserRoleMinOrderByAggregateInput
    _sum?: UserRoleSumOrderByAggregateInput
  }

  export type UserRoleScalarWhereWithAggregatesInput = {
    AND?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[]
    OR?: UserRoleScalarWhereWithAggregatesInput[]
    NOT?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserRole"> | number
    userId?: IntWithAggregatesFilter<"UserRole"> | number
    roleId?: IntWithAggregatesFilter<"UserRole"> | number
  }

  export type RoleClaimWhereInput = {
    AND?: RoleClaimWhereInput | RoleClaimWhereInput[]
    OR?: RoleClaimWhereInput[]
    NOT?: RoleClaimWhereInput | RoleClaimWhereInput[]
    id?: IntFilter<"RoleClaim"> | number
    roleId?: IntFilter<"RoleClaim"> | number
    claim?: StringFilter<"RoleClaim"> | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }

  export type RoleClaimOrderByWithRelationInput = {
    id?: SortOrder
    roleId?: SortOrder
    claim?: SortOrder
    role?: RoleOrderByWithRelationInput
  }

  export type RoleClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    roleId_claim?: RoleClaimRoleIdClaimCompoundUniqueInput
    AND?: RoleClaimWhereInput | RoleClaimWhereInput[]
    OR?: RoleClaimWhereInput[]
    NOT?: RoleClaimWhereInput | RoleClaimWhereInput[]
    roleId?: IntFilter<"RoleClaim"> | number
    claim?: StringFilter<"RoleClaim"> | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }, "id" | "roleId_claim">

  export type RoleClaimOrderByWithAggregationInput = {
    id?: SortOrder
    roleId?: SortOrder
    claim?: SortOrder
    _count?: RoleClaimCountOrderByAggregateInput
    _avg?: RoleClaimAvgOrderByAggregateInput
    _max?: RoleClaimMaxOrderByAggregateInput
    _min?: RoleClaimMinOrderByAggregateInput
    _sum?: RoleClaimSumOrderByAggregateInput
  }

  export type RoleClaimScalarWhereWithAggregatesInput = {
    AND?: RoleClaimScalarWhereWithAggregatesInput | RoleClaimScalarWhereWithAggregatesInput[]
    OR?: RoleClaimScalarWhereWithAggregatesInput[]
    NOT?: RoleClaimScalarWhereWithAggregatesInput | RoleClaimScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RoleClaim"> | number
    roleId?: IntWithAggregatesFilter<"RoleClaim"> | number
    claim?: StringWithAggregatesFilter<"RoleClaim"> | string
  }

  export type CT_NguoiDung_KhoaHocWhereInput = {
    AND?: CT_NguoiDung_KhoaHocWhereInput | CT_NguoiDung_KhoaHocWhereInput[]
    OR?: CT_NguoiDung_KhoaHocWhereInput[]
    NOT?: CT_NguoiDung_KhoaHocWhereInput | CT_NguoiDung_KhoaHocWhereInput[]
    id?: IntFilter<"CT_NguoiDung_KhoaHoc"> | number
    userId?: IntFilter<"CT_NguoiDung_KhoaHoc"> | number
    khoaHocId?: IntFilter<"CT_NguoiDung_KhoaHoc"> | number
    ngayCapNhat?: DateTimeFilter<"CT_NguoiDung_KhoaHoc"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    khoaHoc?: XOR<KhoaHocScalarRelationFilter, KhoaHocWhereInput>
  }

  export type CT_NguoiDung_KhoaHocOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    khoaHocId?: SortOrder
    ngayCapNhat?: SortOrder
    user?: UserOrderByWithRelationInput
    khoaHoc?: KhoaHocOrderByWithRelationInput
  }

  export type CT_NguoiDung_KhoaHocWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_khoaHocId?: CT_NguoiDung_KhoaHocUserIdKhoaHocIdCompoundUniqueInput
    AND?: CT_NguoiDung_KhoaHocWhereInput | CT_NguoiDung_KhoaHocWhereInput[]
    OR?: CT_NguoiDung_KhoaHocWhereInput[]
    NOT?: CT_NguoiDung_KhoaHocWhereInput | CT_NguoiDung_KhoaHocWhereInput[]
    userId?: IntFilter<"CT_NguoiDung_KhoaHoc"> | number
    khoaHocId?: IntFilter<"CT_NguoiDung_KhoaHoc"> | number
    ngayCapNhat?: DateTimeFilter<"CT_NguoiDung_KhoaHoc"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    khoaHoc?: XOR<KhoaHocScalarRelationFilter, KhoaHocWhereInput>
  }, "id" | "userId_khoaHocId">

  export type CT_NguoiDung_KhoaHocOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    khoaHocId?: SortOrder
    ngayCapNhat?: SortOrder
    _count?: CT_NguoiDung_KhoaHocCountOrderByAggregateInput
    _avg?: CT_NguoiDung_KhoaHocAvgOrderByAggregateInput
    _max?: CT_NguoiDung_KhoaHocMaxOrderByAggregateInput
    _min?: CT_NguoiDung_KhoaHocMinOrderByAggregateInput
    _sum?: CT_NguoiDung_KhoaHocSumOrderByAggregateInput
  }

  export type CT_NguoiDung_KhoaHocScalarWhereWithAggregatesInput = {
    AND?: CT_NguoiDung_KhoaHocScalarWhereWithAggregatesInput | CT_NguoiDung_KhoaHocScalarWhereWithAggregatesInput[]
    OR?: CT_NguoiDung_KhoaHocScalarWhereWithAggregatesInput[]
    NOT?: CT_NguoiDung_KhoaHocScalarWhereWithAggregatesInput | CT_NguoiDung_KhoaHocScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CT_NguoiDung_KhoaHoc"> | number
    userId?: IntWithAggregatesFilter<"CT_NguoiDung_KhoaHoc"> | number
    khoaHocId?: IntWithAggregatesFilter<"CT_NguoiDung_KhoaHoc"> | number
    ngayCapNhat?: DateTimeWithAggregatesFilter<"CT_NguoiDung_KhoaHoc"> | Date | string
  }

  export type CT_NguoiDung_BaiHocWhereInput = {
    AND?: CT_NguoiDung_BaiHocWhereInput | CT_NguoiDung_BaiHocWhereInput[]
    OR?: CT_NguoiDung_BaiHocWhereInput[]
    NOT?: CT_NguoiDung_BaiHocWhereInput | CT_NguoiDung_BaiHocWhereInput[]
    id?: IntFilter<"CT_NguoiDung_BaiHoc"> | number
    userId?: IntFilter<"CT_NguoiDung_BaiHoc"> | number
    baiHocId?: IntFilter<"CT_NguoiDung_BaiHoc"> | number
    ngayCapNhat?: DateTimeFilter<"CT_NguoiDung_BaiHoc"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    baiHoc?: XOR<BaiHocScalarRelationFilter, BaiHocWhereInput>
  }

  export type CT_NguoiDung_BaiHocOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    baiHocId?: SortOrder
    ngayCapNhat?: SortOrder
    user?: UserOrderByWithRelationInput
    baiHoc?: BaiHocOrderByWithRelationInput
  }

  export type CT_NguoiDung_BaiHocWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_baiHocId?: CT_NguoiDung_BaiHocUserIdBaiHocIdCompoundUniqueInput
    AND?: CT_NguoiDung_BaiHocWhereInput | CT_NguoiDung_BaiHocWhereInput[]
    OR?: CT_NguoiDung_BaiHocWhereInput[]
    NOT?: CT_NguoiDung_BaiHocWhereInput | CT_NguoiDung_BaiHocWhereInput[]
    userId?: IntFilter<"CT_NguoiDung_BaiHoc"> | number
    baiHocId?: IntFilter<"CT_NguoiDung_BaiHoc"> | number
    ngayCapNhat?: DateTimeFilter<"CT_NguoiDung_BaiHoc"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    baiHoc?: XOR<BaiHocScalarRelationFilter, BaiHocWhereInput>
  }, "id" | "userId_baiHocId">

  export type CT_NguoiDung_BaiHocOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    baiHocId?: SortOrder
    ngayCapNhat?: SortOrder
    _count?: CT_NguoiDung_BaiHocCountOrderByAggregateInput
    _avg?: CT_NguoiDung_BaiHocAvgOrderByAggregateInput
    _max?: CT_NguoiDung_BaiHocMaxOrderByAggregateInput
    _min?: CT_NguoiDung_BaiHocMinOrderByAggregateInput
    _sum?: CT_NguoiDung_BaiHocSumOrderByAggregateInput
  }

  export type CT_NguoiDung_BaiHocScalarWhereWithAggregatesInput = {
    AND?: CT_NguoiDung_BaiHocScalarWhereWithAggregatesInput | CT_NguoiDung_BaiHocScalarWhereWithAggregatesInput[]
    OR?: CT_NguoiDung_BaiHocScalarWhereWithAggregatesInput[]
    NOT?: CT_NguoiDung_BaiHocScalarWhereWithAggregatesInput | CT_NguoiDung_BaiHocScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CT_NguoiDung_BaiHoc"> | number
    userId?: IntWithAggregatesFilter<"CT_NguoiDung_BaiHoc"> | number
    baiHocId?: IntWithAggregatesFilter<"CT_NguoiDung_BaiHoc"> | number
    ngayCapNhat?: DateTimeWithAggregatesFilter<"CT_NguoiDung_BaiHoc"> | Date | string
  }

  export type CauHoiGameWhereInput = {
    AND?: CauHoiGameWhereInput | CauHoiGameWhereInput[]
    OR?: CauHoiGameWhereInput[]
    NOT?: CauHoiGameWhereInput | CauHoiGameWhereInput[]
    id?: IntFilter<"CauHoiGame"> | number
    noiDung?: StringFilter<"CauHoiGame"> | string
    dapAn?: StringFilter<"CauHoiGame"> | string
    capDo?: StringNullableFilter<"CauHoiGame"> | string | null
    chuDe?: StringNullableFilter<"CauHoiGame"> | string | null
    createdAt?: DateTimeFilter<"CauHoiGame"> | Date | string
    lichSuChoiGames?: LichSuChoiGameListRelationFilter
  }

  export type CauHoiGameOrderByWithRelationInput = {
    id?: SortOrder
    noiDung?: SortOrder
    dapAn?: SortOrder
    capDo?: SortOrderInput | SortOrder
    chuDe?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lichSuChoiGames?: LichSuChoiGameOrderByRelationAggregateInput
  }

  export type CauHoiGameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CauHoiGameWhereInput | CauHoiGameWhereInput[]
    OR?: CauHoiGameWhereInput[]
    NOT?: CauHoiGameWhereInput | CauHoiGameWhereInput[]
    noiDung?: StringFilter<"CauHoiGame"> | string
    dapAn?: StringFilter<"CauHoiGame"> | string
    capDo?: StringNullableFilter<"CauHoiGame"> | string | null
    chuDe?: StringNullableFilter<"CauHoiGame"> | string | null
    createdAt?: DateTimeFilter<"CauHoiGame"> | Date | string
    lichSuChoiGames?: LichSuChoiGameListRelationFilter
  }, "id">

  export type CauHoiGameOrderByWithAggregationInput = {
    id?: SortOrder
    noiDung?: SortOrder
    dapAn?: SortOrder
    capDo?: SortOrderInput | SortOrder
    chuDe?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CauHoiGameCountOrderByAggregateInput
    _avg?: CauHoiGameAvgOrderByAggregateInput
    _max?: CauHoiGameMaxOrderByAggregateInput
    _min?: CauHoiGameMinOrderByAggregateInput
    _sum?: CauHoiGameSumOrderByAggregateInput
  }

  export type CauHoiGameScalarWhereWithAggregatesInput = {
    AND?: CauHoiGameScalarWhereWithAggregatesInput | CauHoiGameScalarWhereWithAggregatesInput[]
    OR?: CauHoiGameScalarWhereWithAggregatesInput[]
    NOT?: CauHoiGameScalarWhereWithAggregatesInput | CauHoiGameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CauHoiGame"> | number
    noiDung?: StringWithAggregatesFilter<"CauHoiGame"> | string
    dapAn?: StringWithAggregatesFilter<"CauHoiGame"> | string
    capDo?: StringNullableWithAggregatesFilter<"CauHoiGame"> | string | null
    chuDe?: StringNullableWithAggregatesFilter<"CauHoiGame"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CauHoiGame"> | Date | string
  }

  export type LichSuChoiGameWhereInput = {
    AND?: LichSuChoiGameWhereInput | LichSuChoiGameWhereInput[]
    OR?: LichSuChoiGameWhereInput[]
    NOT?: LichSuChoiGameWhereInput | LichSuChoiGameWhereInput[]
    id?: IntFilter<"LichSuChoiGame"> | number
    userId?: IntFilter<"LichSuChoiGame"> | number
    cauHoiId?: IntFilter<"LichSuChoiGame"> | number
    dapAnNguoiDung?: StringFilter<"LichSuChoiGame"> | string
    dung?: BoolFilter<"LichSuChoiGame"> | boolean
    thoiGianTraLoi?: IntFilter<"LichSuChoiGame"> | number
    thoiGian?: DateTimeFilter<"LichSuChoiGame"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    cauHoiGame?: XOR<CauHoiGameScalarRelationFilter, CauHoiGameWhereInput>
  }

  export type LichSuChoiGameOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    cauHoiId?: SortOrder
    dapAnNguoiDung?: SortOrder
    dung?: SortOrder
    thoiGianTraLoi?: SortOrder
    thoiGian?: SortOrder
    user?: UserOrderByWithRelationInput
    cauHoiGame?: CauHoiGameOrderByWithRelationInput
  }

  export type LichSuChoiGameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LichSuChoiGameWhereInput | LichSuChoiGameWhereInput[]
    OR?: LichSuChoiGameWhereInput[]
    NOT?: LichSuChoiGameWhereInput | LichSuChoiGameWhereInput[]
    userId?: IntFilter<"LichSuChoiGame"> | number
    cauHoiId?: IntFilter<"LichSuChoiGame"> | number
    dapAnNguoiDung?: StringFilter<"LichSuChoiGame"> | string
    dung?: BoolFilter<"LichSuChoiGame"> | boolean
    thoiGianTraLoi?: IntFilter<"LichSuChoiGame"> | number
    thoiGian?: DateTimeFilter<"LichSuChoiGame"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    cauHoiGame?: XOR<CauHoiGameScalarRelationFilter, CauHoiGameWhereInput>
  }, "id">

  export type LichSuChoiGameOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    cauHoiId?: SortOrder
    dapAnNguoiDung?: SortOrder
    dung?: SortOrder
    thoiGianTraLoi?: SortOrder
    thoiGian?: SortOrder
    _count?: LichSuChoiGameCountOrderByAggregateInput
    _avg?: LichSuChoiGameAvgOrderByAggregateInput
    _max?: LichSuChoiGameMaxOrderByAggregateInput
    _min?: LichSuChoiGameMinOrderByAggregateInput
    _sum?: LichSuChoiGameSumOrderByAggregateInput
  }

  export type LichSuChoiGameScalarWhereWithAggregatesInput = {
    AND?: LichSuChoiGameScalarWhereWithAggregatesInput | LichSuChoiGameScalarWhereWithAggregatesInput[]
    OR?: LichSuChoiGameScalarWhereWithAggregatesInput[]
    NOT?: LichSuChoiGameScalarWhereWithAggregatesInput | LichSuChoiGameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LichSuChoiGame"> | number
    userId?: IntWithAggregatesFilter<"LichSuChoiGame"> | number
    cauHoiId?: IntWithAggregatesFilter<"LichSuChoiGame"> | number
    dapAnNguoiDung?: StringWithAggregatesFilter<"LichSuChoiGame"> | string
    dung?: BoolWithAggregatesFilter<"LichSuChoiGame"> | boolean
    thoiGianTraLoi?: IntWithAggregatesFilter<"LichSuChoiGame"> | number
    thoiGian?: DateTimeWithAggregatesFilter<"LichSuChoiGame"> | Date | string
  }

  export type KhoaHocCreateInput = {
    TenKhoaHoc: string
    MoTa?: string | null
    Gia: number
    VideoUrl?: string | null
    HinhAnh?: string | null
    baiHocs?: BaiHocCreateNestedManyWithoutKhoaHocInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocCreateNestedManyWithoutKhoaHocInput
  }

  export type KhoaHocUncheckedCreateInput = {
    KhoaHocId?: number
    TenKhoaHoc: string
    MoTa?: string | null
    Gia: number
    VideoUrl?: string | null
    HinhAnh?: string | null
    baiHocs?: BaiHocUncheckedCreateNestedManyWithoutKhoaHocInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedCreateNestedManyWithoutKhoaHocInput
  }

  export type KhoaHocUpdateInput = {
    TenKhoaHoc?: StringFieldUpdateOperationsInput | string
    MoTa?: NullableStringFieldUpdateOperationsInput | string | null
    Gia?: FloatFieldUpdateOperationsInput | number
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    baiHocs?: BaiHocUpdateManyWithoutKhoaHocNestedInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUpdateManyWithoutKhoaHocNestedInput
  }

  export type KhoaHocUncheckedUpdateInput = {
    KhoaHocId?: IntFieldUpdateOperationsInput | number
    TenKhoaHoc?: StringFieldUpdateOperationsInput | string
    MoTa?: NullableStringFieldUpdateOperationsInput | string | null
    Gia?: FloatFieldUpdateOperationsInput | number
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    baiHocs?: BaiHocUncheckedUpdateManyWithoutKhoaHocNestedInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutKhoaHocNestedInput
  }

  export type KhoaHocCreateManyInput = {
    KhoaHocId?: number
    TenKhoaHoc: string
    MoTa?: string | null
    Gia: number
    VideoUrl?: string | null
    HinhAnh?: string | null
  }

  export type KhoaHocUpdateManyMutationInput = {
    TenKhoaHoc?: StringFieldUpdateOperationsInput | string
    MoTa?: NullableStringFieldUpdateOperationsInput | string | null
    Gia?: FloatFieldUpdateOperationsInput | number
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type KhoaHocUncheckedUpdateManyInput = {
    KhoaHocId?: IntFieldUpdateOperationsInput | number
    TenKhoaHoc?: StringFieldUpdateOperationsInput | string
    MoTa?: NullableStringFieldUpdateOperationsInput | string | null
    Gia?: FloatFieldUpdateOperationsInput | number
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BaiHocCreateInput = {
    TieuDe: string
    NoiDung?: string | null
    VideoUrl?: string | null
    HinhAnh?: string | null
    KhoaHoc: KhoaHocCreateNestedOneWithoutBaiHocsInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocCreateNestedManyWithoutBaiHocInput
  }

  export type BaiHocUncheckedCreateInput = {
    BaiHocId?: number
    TieuDe: string
    NoiDung?: string | null
    VideoUrl?: string | null
    HinhAnh?: string | null
    KhoaHocId: number
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedCreateNestedManyWithoutBaiHocInput
  }

  export type BaiHocUpdateInput = {
    TieuDe?: StringFieldUpdateOperationsInput | string
    NoiDung?: NullableStringFieldUpdateOperationsInput | string | null
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    KhoaHoc?: KhoaHocUpdateOneRequiredWithoutBaiHocsNestedInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUpdateManyWithoutBaiHocNestedInput
  }

  export type BaiHocUncheckedUpdateInput = {
    BaiHocId?: IntFieldUpdateOperationsInput | number
    TieuDe?: StringFieldUpdateOperationsInput | string
    NoiDung?: NullableStringFieldUpdateOperationsInput | string | null
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    KhoaHocId?: IntFieldUpdateOperationsInput | number
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutBaiHocNestedInput
  }

  export type BaiHocCreateManyInput = {
    BaiHocId?: number
    TieuDe: string
    NoiDung?: string | null
    VideoUrl?: string | null
    HinhAnh?: string | null
    KhoaHocId: number
  }

  export type BaiHocUpdateManyMutationInput = {
    TieuDe?: StringFieldUpdateOperationsInput | string
    NoiDung?: NullableStringFieldUpdateOperationsInput | string | null
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BaiHocUncheckedUpdateManyInput = {
    BaiHocId?: IntFieldUpdateOperationsInput | number
    TieuDe?: StringFieldUpdateOperationsInput | string
    NoiDung?: NullableStringFieldUpdateOperationsInput | string | null
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    KhoaHocId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    roles?: UserRoleCreateNestedManyWithoutUserInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocCreateNestedManyWithoutUserInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocCreateNestedManyWithoutUserInput
    lichSuChoiGames?: LichSuChoiGameCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedCreateNestedManyWithoutUserInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedCreateNestedManyWithoutUserInput
    lichSuChoiGames?: LichSuChoiGameUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roles?: UserRoleUpdateManyWithoutUserNestedInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUpdateManyWithoutUserNestedInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUpdateManyWithoutUserNestedInput
    lichSuChoiGames?: LichSuChoiGameUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutUserNestedInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutUserNestedInput
    lichSuChoiGames?: LichSuChoiGameUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type RoleCreateInput = {
    name: string
    claims?: RoleClaimCreateNestedManyWithoutRoleInput
    users?: UserRoleCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: number
    name: string
    claims?: RoleClaimUncheckedCreateNestedManyWithoutRoleInput
    users?: UserRoleUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    claims?: RoleClaimUpdateManyWithoutRoleNestedInput
    users?: UserRoleUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    claims?: RoleClaimUncheckedUpdateManyWithoutRoleNestedInput
    users?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: number
    name: string
  }

  export type RoleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserRoleCreateInput = {
    user: UserCreateNestedOneWithoutRolesInput
    role: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserRoleUncheckedCreateInput = {
    id?: number
    userId: number
    roleId: number
  }

  export type UserRoleUpdateInput = {
    user?: UserUpdateOneRequiredWithoutRolesNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserRoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
  }

  export type UserRoleCreateManyInput = {
    id?: number
    userId: number
    roleId: number
  }

  export type UserRoleUpdateManyMutationInput = {

  }

  export type UserRoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
  }

  export type RoleClaimCreateInput = {
    claim: string
    role: RoleCreateNestedOneWithoutClaimsInput
  }

  export type RoleClaimUncheckedCreateInput = {
    id?: number
    roleId: number
    claim: string
  }

  export type RoleClaimUpdateInput = {
    claim?: StringFieldUpdateOperationsInput | string
    role?: RoleUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type RoleClaimUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    claim?: StringFieldUpdateOperationsInput | string
  }

  export type RoleClaimCreateManyInput = {
    id?: number
    roleId: number
    claim: string
  }

  export type RoleClaimUpdateManyMutationInput = {
    claim?: StringFieldUpdateOperationsInput | string
  }

  export type RoleClaimUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
    claim?: StringFieldUpdateOperationsInput | string
  }

  export type CT_NguoiDung_KhoaHocCreateInput = {
    ngayCapNhat?: Date | string
    user: UserCreateNestedOneWithoutCT_NguoiDung_KhoaHocsInput
    khoaHoc: KhoaHocCreateNestedOneWithoutCT_NguoiDung_KhoaHocsInput
  }

  export type CT_NguoiDung_KhoaHocUncheckedCreateInput = {
    id?: number
    userId: number
    khoaHocId: number
    ngayCapNhat?: Date | string
  }

  export type CT_NguoiDung_KhoaHocUpdateInput = {
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCT_NguoiDung_KhoaHocsNestedInput
    khoaHoc?: KhoaHocUpdateOneRequiredWithoutCT_NguoiDung_KhoaHocsNestedInput
  }

  export type CT_NguoiDung_KhoaHocUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    khoaHocId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_KhoaHocCreateManyInput = {
    id?: number
    userId: number
    khoaHocId: number
    ngayCapNhat?: Date | string
  }

  export type CT_NguoiDung_KhoaHocUpdateManyMutationInput = {
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_KhoaHocUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    khoaHocId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_BaiHocCreateInput = {
    ngayCapNhat?: Date | string
    user: UserCreateNestedOneWithoutCT_NguoiDung_BaiHocsInput
    baiHoc: BaiHocCreateNestedOneWithoutCT_NguoiDung_BaiHocsInput
  }

  export type CT_NguoiDung_BaiHocUncheckedCreateInput = {
    id?: number
    userId: number
    baiHocId: number
    ngayCapNhat?: Date | string
  }

  export type CT_NguoiDung_BaiHocUpdateInput = {
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCT_NguoiDung_BaiHocsNestedInput
    baiHoc?: BaiHocUpdateOneRequiredWithoutCT_NguoiDung_BaiHocsNestedInput
  }

  export type CT_NguoiDung_BaiHocUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    baiHocId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_BaiHocCreateManyInput = {
    id?: number
    userId: number
    baiHocId: number
    ngayCapNhat?: Date | string
  }

  export type CT_NguoiDung_BaiHocUpdateManyMutationInput = {
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_BaiHocUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    baiHocId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CauHoiGameCreateInput = {
    noiDung: string
    dapAn: string
    capDo?: string | null
    chuDe?: string | null
    createdAt?: Date | string
    lichSuChoiGames?: LichSuChoiGameCreateNestedManyWithoutCauHoiGameInput
  }

  export type CauHoiGameUncheckedCreateInput = {
    id?: number
    noiDung: string
    dapAn: string
    capDo?: string | null
    chuDe?: string | null
    createdAt?: Date | string
    lichSuChoiGames?: LichSuChoiGameUncheckedCreateNestedManyWithoutCauHoiGameInput
  }

  export type CauHoiGameUpdateInput = {
    noiDung?: StringFieldUpdateOperationsInput | string
    dapAn?: StringFieldUpdateOperationsInput | string
    capDo?: NullableStringFieldUpdateOperationsInput | string | null
    chuDe?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lichSuChoiGames?: LichSuChoiGameUpdateManyWithoutCauHoiGameNestedInput
  }

  export type CauHoiGameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    noiDung?: StringFieldUpdateOperationsInput | string
    dapAn?: StringFieldUpdateOperationsInput | string
    capDo?: NullableStringFieldUpdateOperationsInput | string | null
    chuDe?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lichSuChoiGames?: LichSuChoiGameUncheckedUpdateManyWithoutCauHoiGameNestedInput
  }

  export type CauHoiGameCreateManyInput = {
    id?: number
    noiDung: string
    dapAn: string
    capDo?: string | null
    chuDe?: string | null
    createdAt?: Date | string
  }

  export type CauHoiGameUpdateManyMutationInput = {
    noiDung?: StringFieldUpdateOperationsInput | string
    dapAn?: StringFieldUpdateOperationsInput | string
    capDo?: NullableStringFieldUpdateOperationsInput | string | null
    chuDe?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CauHoiGameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    noiDung?: StringFieldUpdateOperationsInput | string
    dapAn?: StringFieldUpdateOperationsInput | string
    capDo?: NullableStringFieldUpdateOperationsInput | string | null
    chuDe?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LichSuChoiGameCreateInput = {
    dapAnNguoiDung: string
    dung: boolean
    thoiGianTraLoi: number
    thoiGian?: Date | string
    user: UserCreateNestedOneWithoutLichSuChoiGamesInput
    cauHoiGame: CauHoiGameCreateNestedOneWithoutLichSuChoiGamesInput
  }

  export type LichSuChoiGameUncheckedCreateInput = {
    id?: number
    userId: number
    cauHoiId: number
    dapAnNguoiDung: string
    dung: boolean
    thoiGianTraLoi: number
    thoiGian?: Date | string
  }

  export type LichSuChoiGameUpdateInput = {
    dapAnNguoiDung?: StringFieldUpdateOperationsInput | string
    dung?: BoolFieldUpdateOperationsInput | boolean
    thoiGianTraLoi?: IntFieldUpdateOperationsInput | number
    thoiGian?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLichSuChoiGamesNestedInput
    cauHoiGame?: CauHoiGameUpdateOneRequiredWithoutLichSuChoiGamesNestedInput
  }

  export type LichSuChoiGameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    cauHoiId?: IntFieldUpdateOperationsInput | number
    dapAnNguoiDung?: StringFieldUpdateOperationsInput | string
    dung?: BoolFieldUpdateOperationsInput | boolean
    thoiGianTraLoi?: IntFieldUpdateOperationsInput | number
    thoiGian?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LichSuChoiGameCreateManyInput = {
    id?: number
    userId: number
    cauHoiId: number
    dapAnNguoiDung: string
    dung: boolean
    thoiGianTraLoi: number
    thoiGian?: Date | string
  }

  export type LichSuChoiGameUpdateManyMutationInput = {
    dapAnNguoiDung?: StringFieldUpdateOperationsInput | string
    dung?: BoolFieldUpdateOperationsInput | boolean
    thoiGianTraLoi?: IntFieldUpdateOperationsInput | number
    thoiGian?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LichSuChoiGameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    cauHoiId?: IntFieldUpdateOperationsInput | number
    dapAnNguoiDung?: StringFieldUpdateOperationsInput | string
    dung?: BoolFieldUpdateOperationsInput | boolean
    thoiGianTraLoi?: IntFieldUpdateOperationsInput | number
    thoiGian?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BaiHocListRelationFilter = {
    every?: BaiHocWhereInput
    some?: BaiHocWhereInput
    none?: BaiHocWhereInput
  }

  export type CT_NguoiDung_KhoaHocListRelationFilter = {
    every?: CT_NguoiDung_KhoaHocWhereInput
    some?: CT_NguoiDung_KhoaHocWhereInput
    none?: CT_NguoiDung_KhoaHocWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BaiHocOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CT_NguoiDung_KhoaHocOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KhoaHocCountOrderByAggregateInput = {
    KhoaHocId?: SortOrder
    TenKhoaHoc?: SortOrder
    MoTa?: SortOrder
    Gia?: SortOrder
    VideoUrl?: SortOrder
    HinhAnh?: SortOrder
  }

  export type KhoaHocAvgOrderByAggregateInput = {
    KhoaHocId?: SortOrder
    Gia?: SortOrder
  }

  export type KhoaHocMaxOrderByAggregateInput = {
    KhoaHocId?: SortOrder
    TenKhoaHoc?: SortOrder
    MoTa?: SortOrder
    Gia?: SortOrder
    VideoUrl?: SortOrder
    HinhAnh?: SortOrder
  }

  export type KhoaHocMinOrderByAggregateInput = {
    KhoaHocId?: SortOrder
    TenKhoaHoc?: SortOrder
    MoTa?: SortOrder
    Gia?: SortOrder
    VideoUrl?: SortOrder
    HinhAnh?: SortOrder
  }

  export type KhoaHocSumOrderByAggregateInput = {
    KhoaHocId?: SortOrder
    Gia?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type KhoaHocScalarRelationFilter = {
    is?: KhoaHocWhereInput
    isNot?: KhoaHocWhereInput
  }

  export type CT_NguoiDung_BaiHocListRelationFilter = {
    every?: CT_NguoiDung_BaiHocWhereInput
    some?: CT_NguoiDung_BaiHocWhereInput
    none?: CT_NguoiDung_BaiHocWhereInput
  }

  export type CT_NguoiDung_BaiHocOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BaiHocCountOrderByAggregateInput = {
    BaiHocId?: SortOrder
    TieuDe?: SortOrder
    NoiDung?: SortOrder
    VideoUrl?: SortOrder
    HinhAnh?: SortOrder
    KhoaHocId?: SortOrder
  }

  export type BaiHocAvgOrderByAggregateInput = {
    BaiHocId?: SortOrder
    KhoaHocId?: SortOrder
  }

  export type BaiHocMaxOrderByAggregateInput = {
    BaiHocId?: SortOrder
    TieuDe?: SortOrder
    NoiDung?: SortOrder
    VideoUrl?: SortOrder
    HinhAnh?: SortOrder
    KhoaHocId?: SortOrder
  }

  export type BaiHocMinOrderByAggregateInput = {
    BaiHocId?: SortOrder
    TieuDe?: SortOrder
    NoiDung?: SortOrder
    VideoUrl?: SortOrder
    HinhAnh?: SortOrder
    KhoaHocId?: SortOrder
  }

  export type BaiHocSumOrderByAggregateInput = {
    BaiHocId?: SortOrder
    KhoaHocId?: SortOrder
  }

  export type UserRoleListRelationFilter = {
    every?: UserRoleWhereInput
    some?: UserRoleWhereInput
    none?: UserRoleWhereInput
  }

  export type LichSuChoiGameListRelationFilter = {
    every?: LichSuChoiGameWhereInput
    some?: LichSuChoiGameWhereInput
    none?: LichSuChoiGameWhereInput
  }

  export type UserRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LichSuChoiGameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullname?: SortOrder
    sex?: SortOrder
    phonenumber?: SortOrder
    password?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullname?: SortOrder
    sex?: SortOrder
    phonenumber?: SortOrder
    password?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullname?: SortOrder
    sex?: SortOrder
    phonenumber?: SortOrder
    password?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleClaimListRelationFilter = {
    every?: RoleClaimWhereInput
    some?: RoleClaimWhereInput
    none?: RoleClaimWhereInput
  }

  export type RoleClaimOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RoleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RoleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type UserRoleUserIdRoleIdCompoundUniqueInput = {
    userId: number
    roleId: number
  }

  export type UserRoleCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
  }

  export type UserRoleAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
  }

  export type UserRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
  }

  export type UserRoleMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
  }

  export type UserRoleSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
  }

  export type RoleClaimRoleIdClaimCompoundUniqueInput = {
    roleId: number
    claim: string
  }

  export type RoleClaimCountOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    claim?: SortOrder
  }

  export type RoleClaimAvgOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
  }

  export type RoleClaimMaxOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    claim?: SortOrder
  }

  export type RoleClaimMinOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    claim?: SortOrder
  }

  export type RoleClaimSumOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CT_NguoiDung_KhoaHocUserIdKhoaHocIdCompoundUniqueInput = {
    userId: number
    khoaHocId: number
  }

  export type CT_NguoiDung_KhoaHocCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    khoaHocId?: SortOrder
    ngayCapNhat?: SortOrder
  }

  export type CT_NguoiDung_KhoaHocAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    khoaHocId?: SortOrder
  }

  export type CT_NguoiDung_KhoaHocMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    khoaHocId?: SortOrder
    ngayCapNhat?: SortOrder
  }

  export type CT_NguoiDung_KhoaHocMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    khoaHocId?: SortOrder
    ngayCapNhat?: SortOrder
  }

  export type CT_NguoiDung_KhoaHocSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    khoaHocId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BaiHocScalarRelationFilter = {
    is?: BaiHocWhereInput
    isNot?: BaiHocWhereInput
  }

  export type CT_NguoiDung_BaiHocUserIdBaiHocIdCompoundUniqueInput = {
    userId: number
    baiHocId: number
  }

  export type CT_NguoiDung_BaiHocCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    baiHocId?: SortOrder
    ngayCapNhat?: SortOrder
  }

  export type CT_NguoiDung_BaiHocAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    baiHocId?: SortOrder
  }

  export type CT_NguoiDung_BaiHocMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    baiHocId?: SortOrder
    ngayCapNhat?: SortOrder
  }

  export type CT_NguoiDung_BaiHocMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    baiHocId?: SortOrder
    ngayCapNhat?: SortOrder
  }

  export type CT_NguoiDung_BaiHocSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    baiHocId?: SortOrder
  }

  export type CauHoiGameCountOrderByAggregateInput = {
    id?: SortOrder
    noiDung?: SortOrder
    dapAn?: SortOrder
    capDo?: SortOrder
    chuDe?: SortOrder
    createdAt?: SortOrder
  }

  export type CauHoiGameAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CauHoiGameMaxOrderByAggregateInput = {
    id?: SortOrder
    noiDung?: SortOrder
    dapAn?: SortOrder
    capDo?: SortOrder
    chuDe?: SortOrder
    createdAt?: SortOrder
  }

  export type CauHoiGameMinOrderByAggregateInput = {
    id?: SortOrder
    noiDung?: SortOrder
    dapAn?: SortOrder
    capDo?: SortOrder
    chuDe?: SortOrder
    createdAt?: SortOrder
  }

  export type CauHoiGameSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CauHoiGameScalarRelationFilter = {
    is?: CauHoiGameWhereInput
    isNot?: CauHoiGameWhereInput
  }

  export type LichSuChoiGameCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cauHoiId?: SortOrder
    dapAnNguoiDung?: SortOrder
    dung?: SortOrder
    thoiGianTraLoi?: SortOrder
    thoiGian?: SortOrder
  }

  export type LichSuChoiGameAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cauHoiId?: SortOrder
    thoiGianTraLoi?: SortOrder
  }

  export type LichSuChoiGameMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cauHoiId?: SortOrder
    dapAnNguoiDung?: SortOrder
    dung?: SortOrder
    thoiGianTraLoi?: SortOrder
    thoiGian?: SortOrder
  }

  export type LichSuChoiGameMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cauHoiId?: SortOrder
    dapAnNguoiDung?: SortOrder
    dung?: SortOrder
    thoiGianTraLoi?: SortOrder
    thoiGian?: SortOrder
  }

  export type LichSuChoiGameSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cauHoiId?: SortOrder
    thoiGianTraLoi?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BaiHocCreateNestedManyWithoutKhoaHocInput = {
    create?: XOR<BaiHocCreateWithoutKhoaHocInput, BaiHocUncheckedCreateWithoutKhoaHocInput> | BaiHocCreateWithoutKhoaHocInput[] | BaiHocUncheckedCreateWithoutKhoaHocInput[]
    connectOrCreate?: BaiHocCreateOrConnectWithoutKhoaHocInput | BaiHocCreateOrConnectWithoutKhoaHocInput[]
    createMany?: BaiHocCreateManyKhoaHocInputEnvelope
    connect?: BaiHocWhereUniqueInput | BaiHocWhereUniqueInput[]
  }

  export type CT_NguoiDung_KhoaHocCreateNestedManyWithoutKhoaHocInput = {
    create?: XOR<CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput> | CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput[] | CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput[]
    connectOrCreate?: CT_NguoiDung_KhoaHocCreateOrConnectWithoutKhoaHocInput | CT_NguoiDung_KhoaHocCreateOrConnectWithoutKhoaHocInput[]
    createMany?: CT_NguoiDung_KhoaHocCreateManyKhoaHocInputEnvelope
    connect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
  }

  export type BaiHocUncheckedCreateNestedManyWithoutKhoaHocInput = {
    create?: XOR<BaiHocCreateWithoutKhoaHocInput, BaiHocUncheckedCreateWithoutKhoaHocInput> | BaiHocCreateWithoutKhoaHocInput[] | BaiHocUncheckedCreateWithoutKhoaHocInput[]
    connectOrCreate?: BaiHocCreateOrConnectWithoutKhoaHocInput | BaiHocCreateOrConnectWithoutKhoaHocInput[]
    createMany?: BaiHocCreateManyKhoaHocInputEnvelope
    connect?: BaiHocWhereUniqueInput | BaiHocWhereUniqueInput[]
  }

  export type CT_NguoiDung_KhoaHocUncheckedCreateNestedManyWithoutKhoaHocInput = {
    create?: XOR<CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput> | CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput[] | CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput[]
    connectOrCreate?: CT_NguoiDung_KhoaHocCreateOrConnectWithoutKhoaHocInput | CT_NguoiDung_KhoaHocCreateOrConnectWithoutKhoaHocInput[]
    createMany?: CT_NguoiDung_KhoaHocCreateManyKhoaHocInputEnvelope
    connect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BaiHocUpdateManyWithoutKhoaHocNestedInput = {
    create?: XOR<BaiHocCreateWithoutKhoaHocInput, BaiHocUncheckedCreateWithoutKhoaHocInput> | BaiHocCreateWithoutKhoaHocInput[] | BaiHocUncheckedCreateWithoutKhoaHocInput[]
    connectOrCreate?: BaiHocCreateOrConnectWithoutKhoaHocInput | BaiHocCreateOrConnectWithoutKhoaHocInput[]
    upsert?: BaiHocUpsertWithWhereUniqueWithoutKhoaHocInput | BaiHocUpsertWithWhereUniqueWithoutKhoaHocInput[]
    createMany?: BaiHocCreateManyKhoaHocInputEnvelope
    set?: BaiHocWhereUniqueInput | BaiHocWhereUniqueInput[]
    disconnect?: BaiHocWhereUniqueInput | BaiHocWhereUniqueInput[]
    delete?: BaiHocWhereUniqueInput | BaiHocWhereUniqueInput[]
    connect?: BaiHocWhereUniqueInput | BaiHocWhereUniqueInput[]
    update?: BaiHocUpdateWithWhereUniqueWithoutKhoaHocInput | BaiHocUpdateWithWhereUniqueWithoutKhoaHocInput[]
    updateMany?: BaiHocUpdateManyWithWhereWithoutKhoaHocInput | BaiHocUpdateManyWithWhereWithoutKhoaHocInput[]
    deleteMany?: BaiHocScalarWhereInput | BaiHocScalarWhereInput[]
  }

  export type CT_NguoiDung_KhoaHocUpdateManyWithoutKhoaHocNestedInput = {
    create?: XOR<CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput> | CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput[] | CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput[]
    connectOrCreate?: CT_NguoiDung_KhoaHocCreateOrConnectWithoutKhoaHocInput | CT_NguoiDung_KhoaHocCreateOrConnectWithoutKhoaHocInput[]
    upsert?: CT_NguoiDung_KhoaHocUpsertWithWhereUniqueWithoutKhoaHocInput | CT_NguoiDung_KhoaHocUpsertWithWhereUniqueWithoutKhoaHocInput[]
    createMany?: CT_NguoiDung_KhoaHocCreateManyKhoaHocInputEnvelope
    set?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    disconnect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    delete?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    connect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    update?: CT_NguoiDung_KhoaHocUpdateWithWhereUniqueWithoutKhoaHocInput | CT_NguoiDung_KhoaHocUpdateWithWhereUniqueWithoutKhoaHocInput[]
    updateMany?: CT_NguoiDung_KhoaHocUpdateManyWithWhereWithoutKhoaHocInput | CT_NguoiDung_KhoaHocUpdateManyWithWhereWithoutKhoaHocInput[]
    deleteMany?: CT_NguoiDung_KhoaHocScalarWhereInput | CT_NguoiDung_KhoaHocScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BaiHocUncheckedUpdateManyWithoutKhoaHocNestedInput = {
    create?: XOR<BaiHocCreateWithoutKhoaHocInput, BaiHocUncheckedCreateWithoutKhoaHocInput> | BaiHocCreateWithoutKhoaHocInput[] | BaiHocUncheckedCreateWithoutKhoaHocInput[]
    connectOrCreate?: BaiHocCreateOrConnectWithoutKhoaHocInput | BaiHocCreateOrConnectWithoutKhoaHocInput[]
    upsert?: BaiHocUpsertWithWhereUniqueWithoutKhoaHocInput | BaiHocUpsertWithWhereUniqueWithoutKhoaHocInput[]
    createMany?: BaiHocCreateManyKhoaHocInputEnvelope
    set?: BaiHocWhereUniqueInput | BaiHocWhereUniqueInput[]
    disconnect?: BaiHocWhereUniqueInput | BaiHocWhereUniqueInput[]
    delete?: BaiHocWhereUniqueInput | BaiHocWhereUniqueInput[]
    connect?: BaiHocWhereUniqueInput | BaiHocWhereUniqueInput[]
    update?: BaiHocUpdateWithWhereUniqueWithoutKhoaHocInput | BaiHocUpdateWithWhereUniqueWithoutKhoaHocInput[]
    updateMany?: BaiHocUpdateManyWithWhereWithoutKhoaHocInput | BaiHocUpdateManyWithWhereWithoutKhoaHocInput[]
    deleteMany?: BaiHocScalarWhereInput | BaiHocScalarWhereInput[]
  }

  export type CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutKhoaHocNestedInput = {
    create?: XOR<CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput> | CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput[] | CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput[]
    connectOrCreate?: CT_NguoiDung_KhoaHocCreateOrConnectWithoutKhoaHocInput | CT_NguoiDung_KhoaHocCreateOrConnectWithoutKhoaHocInput[]
    upsert?: CT_NguoiDung_KhoaHocUpsertWithWhereUniqueWithoutKhoaHocInput | CT_NguoiDung_KhoaHocUpsertWithWhereUniqueWithoutKhoaHocInput[]
    createMany?: CT_NguoiDung_KhoaHocCreateManyKhoaHocInputEnvelope
    set?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    disconnect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    delete?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    connect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    update?: CT_NguoiDung_KhoaHocUpdateWithWhereUniqueWithoutKhoaHocInput | CT_NguoiDung_KhoaHocUpdateWithWhereUniqueWithoutKhoaHocInput[]
    updateMany?: CT_NguoiDung_KhoaHocUpdateManyWithWhereWithoutKhoaHocInput | CT_NguoiDung_KhoaHocUpdateManyWithWhereWithoutKhoaHocInput[]
    deleteMany?: CT_NguoiDung_KhoaHocScalarWhereInput | CT_NguoiDung_KhoaHocScalarWhereInput[]
  }

  export type KhoaHocCreateNestedOneWithoutBaiHocsInput = {
    create?: XOR<KhoaHocCreateWithoutBaiHocsInput, KhoaHocUncheckedCreateWithoutBaiHocsInput>
    connectOrCreate?: KhoaHocCreateOrConnectWithoutBaiHocsInput
    connect?: KhoaHocWhereUniqueInput
  }

  export type CT_NguoiDung_BaiHocCreateNestedManyWithoutBaiHocInput = {
    create?: XOR<CT_NguoiDung_BaiHocCreateWithoutBaiHocInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput> | CT_NguoiDung_BaiHocCreateWithoutBaiHocInput[] | CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput[]
    connectOrCreate?: CT_NguoiDung_BaiHocCreateOrConnectWithoutBaiHocInput | CT_NguoiDung_BaiHocCreateOrConnectWithoutBaiHocInput[]
    createMany?: CT_NguoiDung_BaiHocCreateManyBaiHocInputEnvelope
    connect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
  }

  export type CT_NguoiDung_BaiHocUncheckedCreateNestedManyWithoutBaiHocInput = {
    create?: XOR<CT_NguoiDung_BaiHocCreateWithoutBaiHocInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput> | CT_NguoiDung_BaiHocCreateWithoutBaiHocInput[] | CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput[]
    connectOrCreate?: CT_NguoiDung_BaiHocCreateOrConnectWithoutBaiHocInput | CT_NguoiDung_BaiHocCreateOrConnectWithoutBaiHocInput[]
    createMany?: CT_NguoiDung_BaiHocCreateManyBaiHocInputEnvelope
    connect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
  }

  export type KhoaHocUpdateOneRequiredWithoutBaiHocsNestedInput = {
    create?: XOR<KhoaHocCreateWithoutBaiHocsInput, KhoaHocUncheckedCreateWithoutBaiHocsInput>
    connectOrCreate?: KhoaHocCreateOrConnectWithoutBaiHocsInput
    upsert?: KhoaHocUpsertWithoutBaiHocsInput
    connect?: KhoaHocWhereUniqueInput
    update?: XOR<XOR<KhoaHocUpdateToOneWithWhereWithoutBaiHocsInput, KhoaHocUpdateWithoutBaiHocsInput>, KhoaHocUncheckedUpdateWithoutBaiHocsInput>
  }

  export type CT_NguoiDung_BaiHocUpdateManyWithoutBaiHocNestedInput = {
    create?: XOR<CT_NguoiDung_BaiHocCreateWithoutBaiHocInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput> | CT_NguoiDung_BaiHocCreateWithoutBaiHocInput[] | CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput[]
    connectOrCreate?: CT_NguoiDung_BaiHocCreateOrConnectWithoutBaiHocInput | CT_NguoiDung_BaiHocCreateOrConnectWithoutBaiHocInput[]
    upsert?: CT_NguoiDung_BaiHocUpsertWithWhereUniqueWithoutBaiHocInput | CT_NguoiDung_BaiHocUpsertWithWhereUniqueWithoutBaiHocInput[]
    createMany?: CT_NguoiDung_BaiHocCreateManyBaiHocInputEnvelope
    set?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    disconnect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    delete?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    connect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    update?: CT_NguoiDung_BaiHocUpdateWithWhereUniqueWithoutBaiHocInput | CT_NguoiDung_BaiHocUpdateWithWhereUniqueWithoutBaiHocInput[]
    updateMany?: CT_NguoiDung_BaiHocUpdateManyWithWhereWithoutBaiHocInput | CT_NguoiDung_BaiHocUpdateManyWithWhereWithoutBaiHocInput[]
    deleteMany?: CT_NguoiDung_BaiHocScalarWhereInput | CT_NguoiDung_BaiHocScalarWhereInput[]
  }

  export type CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutBaiHocNestedInput = {
    create?: XOR<CT_NguoiDung_BaiHocCreateWithoutBaiHocInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput> | CT_NguoiDung_BaiHocCreateWithoutBaiHocInput[] | CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput[]
    connectOrCreate?: CT_NguoiDung_BaiHocCreateOrConnectWithoutBaiHocInput | CT_NguoiDung_BaiHocCreateOrConnectWithoutBaiHocInput[]
    upsert?: CT_NguoiDung_BaiHocUpsertWithWhereUniqueWithoutBaiHocInput | CT_NguoiDung_BaiHocUpsertWithWhereUniqueWithoutBaiHocInput[]
    createMany?: CT_NguoiDung_BaiHocCreateManyBaiHocInputEnvelope
    set?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    disconnect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    delete?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    connect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    update?: CT_NguoiDung_BaiHocUpdateWithWhereUniqueWithoutBaiHocInput | CT_NguoiDung_BaiHocUpdateWithWhereUniqueWithoutBaiHocInput[]
    updateMany?: CT_NguoiDung_BaiHocUpdateManyWithWhereWithoutBaiHocInput | CT_NguoiDung_BaiHocUpdateManyWithWhereWithoutBaiHocInput[]
    deleteMany?: CT_NguoiDung_BaiHocScalarWhereInput | CT_NguoiDung_BaiHocScalarWhereInput[]
  }

  export type UserRoleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type CT_NguoiDung_KhoaHocCreateNestedManyWithoutUserInput = {
    create?: XOR<CT_NguoiDung_KhoaHocCreateWithoutUserInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput> | CT_NguoiDung_KhoaHocCreateWithoutUserInput[] | CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CT_NguoiDung_KhoaHocCreateOrConnectWithoutUserInput | CT_NguoiDung_KhoaHocCreateOrConnectWithoutUserInput[]
    createMany?: CT_NguoiDung_KhoaHocCreateManyUserInputEnvelope
    connect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
  }

  export type CT_NguoiDung_BaiHocCreateNestedManyWithoutUserInput = {
    create?: XOR<CT_NguoiDung_BaiHocCreateWithoutUserInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput> | CT_NguoiDung_BaiHocCreateWithoutUserInput[] | CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CT_NguoiDung_BaiHocCreateOrConnectWithoutUserInput | CT_NguoiDung_BaiHocCreateOrConnectWithoutUserInput[]
    createMany?: CT_NguoiDung_BaiHocCreateManyUserInputEnvelope
    connect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
  }

  export type LichSuChoiGameCreateNestedManyWithoutUserInput = {
    create?: XOR<LichSuChoiGameCreateWithoutUserInput, LichSuChoiGameUncheckedCreateWithoutUserInput> | LichSuChoiGameCreateWithoutUserInput[] | LichSuChoiGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LichSuChoiGameCreateOrConnectWithoutUserInput | LichSuChoiGameCreateOrConnectWithoutUserInput[]
    createMany?: LichSuChoiGameCreateManyUserInputEnvelope
    connect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
  }

  export type UserRoleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type CT_NguoiDung_KhoaHocUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CT_NguoiDung_KhoaHocCreateWithoutUserInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput> | CT_NguoiDung_KhoaHocCreateWithoutUserInput[] | CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CT_NguoiDung_KhoaHocCreateOrConnectWithoutUserInput | CT_NguoiDung_KhoaHocCreateOrConnectWithoutUserInput[]
    createMany?: CT_NguoiDung_KhoaHocCreateManyUserInputEnvelope
    connect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
  }

  export type CT_NguoiDung_BaiHocUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CT_NguoiDung_BaiHocCreateWithoutUserInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput> | CT_NguoiDung_BaiHocCreateWithoutUserInput[] | CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CT_NguoiDung_BaiHocCreateOrConnectWithoutUserInput | CT_NguoiDung_BaiHocCreateOrConnectWithoutUserInput[]
    createMany?: CT_NguoiDung_BaiHocCreateManyUserInputEnvelope
    connect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
  }

  export type LichSuChoiGameUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LichSuChoiGameCreateWithoutUserInput, LichSuChoiGameUncheckedCreateWithoutUserInput> | LichSuChoiGameCreateWithoutUserInput[] | LichSuChoiGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LichSuChoiGameCreateOrConnectWithoutUserInput | LichSuChoiGameCreateOrConnectWithoutUserInput[]
    createMany?: LichSuChoiGameCreateManyUserInputEnvelope
    connect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
  }

  export type UserRoleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type CT_NguoiDung_KhoaHocUpdateManyWithoutUserNestedInput = {
    create?: XOR<CT_NguoiDung_KhoaHocCreateWithoutUserInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput> | CT_NguoiDung_KhoaHocCreateWithoutUserInput[] | CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CT_NguoiDung_KhoaHocCreateOrConnectWithoutUserInput | CT_NguoiDung_KhoaHocCreateOrConnectWithoutUserInput[]
    upsert?: CT_NguoiDung_KhoaHocUpsertWithWhereUniqueWithoutUserInput | CT_NguoiDung_KhoaHocUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CT_NguoiDung_KhoaHocCreateManyUserInputEnvelope
    set?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    disconnect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    delete?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    connect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    update?: CT_NguoiDung_KhoaHocUpdateWithWhereUniqueWithoutUserInput | CT_NguoiDung_KhoaHocUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CT_NguoiDung_KhoaHocUpdateManyWithWhereWithoutUserInput | CT_NguoiDung_KhoaHocUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CT_NguoiDung_KhoaHocScalarWhereInput | CT_NguoiDung_KhoaHocScalarWhereInput[]
  }

  export type CT_NguoiDung_BaiHocUpdateManyWithoutUserNestedInput = {
    create?: XOR<CT_NguoiDung_BaiHocCreateWithoutUserInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput> | CT_NguoiDung_BaiHocCreateWithoutUserInput[] | CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CT_NguoiDung_BaiHocCreateOrConnectWithoutUserInput | CT_NguoiDung_BaiHocCreateOrConnectWithoutUserInput[]
    upsert?: CT_NguoiDung_BaiHocUpsertWithWhereUniqueWithoutUserInput | CT_NguoiDung_BaiHocUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CT_NguoiDung_BaiHocCreateManyUserInputEnvelope
    set?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    disconnect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    delete?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    connect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    update?: CT_NguoiDung_BaiHocUpdateWithWhereUniqueWithoutUserInput | CT_NguoiDung_BaiHocUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CT_NguoiDung_BaiHocUpdateManyWithWhereWithoutUserInput | CT_NguoiDung_BaiHocUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CT_NguoiDung_BaiHocScalarWhereInput | CT_NguoiDung_BaiHocScalarWhereInput[]
  }

  export type LichSuChoiGameUpdateManyWithoutUserNestedInput = {
    create?: XOR<LichSuChoiGameCreateWithoutUserInput, LichSuChoiGameUncheckedCreateWithoutUserInput> | LichSuChoiGameCreateWithoutUserInput[] | LichSuChoiGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LichSuChoiGameCreateOrConnectWithoutUserInput | LichSuChoiGameCreateOrConnectWithoutUserInput[]
    upsert?: LichSuChoiGameUpsertWithWhereUniqueWithoutUserInput | LichSuChoiGameUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LichSuChoiGameCreateManyUserInputEnvelope
    set?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    disconnect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    delete?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    connect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    update?: LichSuChoiGameUpdateWithWhereUniqueWithoutUserInput | LichSuChoiGameUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LichSuChoiGameUpdateManyWithWhereWithoutUserInput | LichSuChoiGameUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LichSuChoiGameScalarWhereInput | LichSuChoiGameScalarWhereInput[]
  }

  export type UserRoleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CT_NguoiDung_KhoaHocCreateWithoutUserInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput> | CT_NguoiDung_KhoaHocCreateWithoutUserInput[] | CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CT_NguoiDung_KhoaHocCreateOrConnectWithoutUserInput | CT_NguoiDung_KhoaHocCreateOrConnectWithoutUserInput[]
    upsert?: CT_NguoiDung_KhoaHocUpsertWithWhereUniqueWithoutUserInput | CT_NguoiDung_KhoaHocUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CT_NguoiDung_KhoaHocCreateManyUserInputEnvelope
    set?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    disconnect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    delete?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    connect?: CT_NguoiDung_KhoaHocWhereUniqueInput | CT_NguoiDung_KhoaHocWhereUniqueInput[]
    update?: CT_NguoiDung_KhoaHocUpdateWithWhereUniqueWithoutUserInput | CT_NguoiDung_KhoaHocUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CT_NguoiDung_KhoaHocUpdateManyWithWhereWithoutUserInput | CT_NguoiDung_KhoaHocUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CT_NguoiDung_KhoaHocScalarWhereInput | CT_NguoiDung_KhoaHocScalarWhereInput[]
  }

  export type CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CT_NguoiDung_BaiHocCreateWithoutUserInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput> | CT_NguoiDung_BaiHocCreateWithoutUserInput[] | CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CT_NguoiDung_BaiHocCreateOrConnectWithoutUserInput | CT_NguoiDung_BaiHocCreateOrConnectWithoutUserInput[]
    upsert?: CT_NguoiDung_BaiHocUpsertWithWhereUniqueWithoutUserInput | CT_NguoiDung_BaiHocUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CT_NguoiDung_BaiHocCreateManyUserInputEnvelope
    set?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    disconnect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    delete?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    connect?: CT_NguoiDung_BaiHocWhereUniqueInput | CT_NguoiDung_BaiHocWhereUniqueInput[]
    update?: CT_NguoiDung_BaiHocUpdateWithWhereUniqueWithoutUserInput | CT_NguoiDung_BaiHocUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CT_NguoiDung_BaiHocUpdateManyWithWhereWithoutUserInput | CT_NguoiDung_BaiHocUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CT_NguoiDung_BaiHocScalarWhereInput | CT_NguoiDung_BaiHocScalarWhereInput[]
  }

  export type LichSuChoiGameUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LichSuChoiGameCreateWithoutUserInput, LichSuChoiGameUncheckedCreateWithoutUserInput> | LichSuChoiGameCreateWithoutUserInput[] | LichSuChoiGameUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LichSuChoiGameCreateOrConnectWithoutUserInput | LichSuChoiGameCreateOrConnectWithoutUserInput[]
    upsert?: LichSuChoiGameUpsertWithWhereUniqueWithoutUserInput | LichSuChoiGameUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LichSuChoiGameCreateManyUserInputEnvelope
    set?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    disconnect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    delete?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    connect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    update?: LichSuChoiGameUpdateWithWhereUniqueWithoutUserInput | LichSuChoiGameUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LichSuChoiGameUpdateManyWithWhereWithoutUserInput | LichSuChoiGameUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LichSuChoiGameScalarWhereInput | LichSuChoiGameScalarWhereInput[]
  }

  export type RoleClaimCreateNestedManyWithoutRoleInput = {
    create?: XOR<RoleClaimCreateWithoutRoleInput, RoleClaimUncheckedCreateWithoutRoleInput> | RoleClaimCreateWithoutRoleInput[] | RoleClaimUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleClaimCreateOrConnectWithoutRoleInput | RoleClaimCreateOrConnectWithoutRoleInput[]
    createMany?: RoleClaimCreateManyRoleInputEnvelope
    connect?: RoleClaimWhereUniqueInput | RoleClaimWhereUniqueInput[]
  }

  export type UserRoleCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type RoleClaimUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RoleClaimCreateWithoutRoleInput, RoleClaimUncheckedCreateWithoutRoleInput> | RoleClaimCreateWithoutRoleInput[] | RoleClaimUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleClaimCreateOrConnectWithoutRoleInput | RoleClaimCreateOrConnectWithoutRoleInput[]
    createMany?: RoleClaimCreateManyRoleInputEnvelope
    connect?: RoleClaimWhereUniqueInput | RoleClaimWhereUniqueInput[]
  }

  export type UserRoleUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type RoleClaimUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RoleClaimCreateWithoutRoleInput, RoleClaimUncheckedCreateWithoutRoleInput> | RoleClaimCreateWithoutRoleInput[] | RoleClaimUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleClaimCreateOrConnectWithoutRoleInput | RoleClaimCreateOrConnectWithoutRoleInput[]
    upsert?: RoleClaimUpsertWithWhereUniqueWithoutRoleInput | RoleClaimUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RoleClaimCreateManyRoleInputEnvelope
    set?: RoleClaimWhereUniqueInput | RoleClaimWhereUniqueInput[]
    disconnect?: RoleClaimWhereUniqueInput | RoleClaimWhereUniqueInput[]
    delete?: RoleClaimWhereUniqueInput | RoleClaimWhereUniqueInput[]
    connect?: RoleClaimWhereUniqueInput | RoleClaimWhereUniqueInput[]
    update?: RoleClaimUpdateWithWhereUniqueWithoutRoleInput | RoleClaimUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RoleClaimUpdateManyWithWhereWithoutRoleInput | RoleClaimUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RoleClaimScalarWhereInput | RoleClaimScalarWhereInput[]
  }

  export type UserRoleUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type RoleClaimUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RoleClaimCreateWithoutRoleInput, RoleClaimUncheckedCreateWithoutRoleInput> | RoleClaimCreateWithoutRoleInput[] | RoleClaimUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleClaimCreateOrConnectWithoutRoleInput | RoleClaimCreateOrConnectWithoutRoleInput[]
    upsert?: RoleClaimUpsertWithWhereUniqueWithoutRoleInput | RoleClaimUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RoleClaimCreateManyRoleInputEnvelope
    set?: RoleClaimWhereUniqueInput | RoleClaimWhereUniqueInput[]
    disconnect?: RoleClaimWhereUniqueInput | RoleClaimWhereUniqueInput[]
    delete?: RoleClaimWhereUniqueInput | RoleClaimWhereUniqueInput[]
    connect?: RoleClaimWhereUniqueInput | RoleClaimWhereUniqueInput[]
    update?: RoleClaimUpdateWithWhereUniqueWithoutRoleInput | RoleClaimUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RoleClaimUpdateManyWithWhereWithoutRoleInput | RoleClaimUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RoleClaimScalarWhereInput | RoleClaimScalarWhereInput[]
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRolesInput = {
    create?: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRolesInput
    connect?: UserWhereUniqueInput
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRolesNestedInput = {
    create?: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRolesInput
    upsert?: UserUpsertWithoutRolesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRolesInput, UserUpdateWithoutRolesInput>, UserUncheckedUpdateWithoutRolesInput>
  }

  export type RoleUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    upsert?: RoleUpsertWithoutUsersInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleCreateNestedOneWithoutClaimsInput = {
    create?: XOR<RoleCreateWithoutClaimsInput, RoleUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutClaimsInput
    connect?: RoleWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<RoleCreateWithoutClaimsInput, RoleUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutClaimsInput
    upsert?: RoleUpsertWithoutClaimsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutClaimsInput, RoleUpdateWithoutClaimsInput>, RoleUncheckedUpdateWithoutClaimsInput>
  }

  export type UserCreateNestedOneWithoutCT_NguoiDung_KhoaHocsInput = {
    create?: XOR<UserCreateWithoutCT_NguoiDung_KhoaHocsInput, UserUncheckedCreateWithoutCT_NguoiDung_KhoaHocsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCT_NguoiDung_KhoaHocsInput
    connect?: UserWhereUniqueInput
  }

  export type KhoaHocCreateNestedOneWithoutCT_NguoiDung_KhoaHocsInput = {
    create?: XOR<KhoaHocCreateWithoutCT_NguoiDung_KhoaHocsInput, KhoaHocUncheckedCreateWithoutCT_NguoiDung_KhoaHocsInput>
    connectOrCreate?: KhoaHocCreateOrConnectWithoutCT_NguoiDung_KhoaHocsInput
    connect?: KhoaHocWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutCT_NguoiDung_KhoaHocsNestedInput = {
    create?: XOR<UserCreateWithoutCT_NguoiDung_KhoaHocsInput, UserUncheckedCreateWithoutCT_NguoiDung_KhoaHocsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCT_NguoiDung_KhoaHocsInput
    upsert?: UserUpsertWithoutCT_NguoiDung_KhoaHocsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCT_NguoiDung_KhoaHocsInput, UserUpdateWithoutCT_NguoiDung_KhoaHocsInput>, UserUncheckedUpdateWithoutCT_NguoiDung_KhoaHocsInput>
  }

  export type KhoaHocUpdateOneRequiredWithoutCT_NguoiDung_KhoaHocsNestedInput = {
    create?: XOR<KhoaHocCreateWithoutCT_NguoiDung_KhoaHocsInput, KhoaHocUncheckedCreateWithoutCT_NguoiDung_KhoaHocsInput>
    connectOrCreate?: KhoaHocCreateOrConnectWithoutCT_NguoiDung_KhoaHocsInput
    upsert?: KhoaHocUpsertWithoutCT_NguoiDung_KhoaHocsInput
    connect?: KhoaHocWhereUniqueInput
    update?: XOR<XOR<KhoaHocUpdateToOneWithWhereWithoutCT_NguoiDung_KhoaHocsInput, KhoaHocUpdateWithoutCT_NguoiDung_KhoaHocsInput>, KhoaHocUncheckedUpdateWithoutCT_NguoiDung_KhoaHocsInput>
  }

  export type UserCreateNestedOneWithoutCT_NguoiDung_BaiHocsInput = {
    create?: XOR<UserCreateWithoutCT_NguoiDung_BaiHocsInput, UserUncheckedCreateWithoutCT_NguoiDung_BaiHocsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCT_NguoiDung_BaiHocsInput
    connect?: UserWhereUniqueInput
  }

  export type BaiHocCreateNestedOneWithoutCT_NguoiDung_BaiHocsInput = {
    create?: XOR<BaiHocCreateWithoutCT_NguoiDung_BaiHocsInput, BaiHocUncheckedCreateWithoutCT_NguoiDung_BaiHocsInput>
    connectOrCreate?: BaiHocCreateOrConnectWithoutCT_NguoiDung_BaiHocsInput
    connect?: BaiHocWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCT_NguoiDung_BaiHocsNestedInput = {
    create?: XOR<UserCreateWithoutCT_NguoiDung_BaiHocsInput, UserUncheckedCreateWithoutCT_NguoiDung_BaiHocsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCT_NguoiDung_BaiHocsInput
    upsert?: UserUpsertWithoutCT_NguoiDung_BaiHocsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCT_NguoiDung_BaiHocsInput, UserUpdateWithoutCT_NguoiDung_BaiHocsInput>, UserUncheckedUpdateWithoutCT_NguoiDung_BaiHocsInput>
  }

  export type BaiHocUpdateOneRequiredWithoutCT_NguoiDung_BaiHocsNestedInput = {
    create?: XOR<BaiHocCreateWithoutCT_NguoiDung_BaiHocsInput, BaiHocUncheckedCreateWithoutCT_NguoiDung_BaiHocsInput>
    connectOrCreate?: BaiHocCreateOrConnectWithoutCT_NguoiDung_BaiHocsInput
    upsert?: BaiHocUpsertWithoutCT_NguoiDung_BaiHocsInput
    connect?: BaiHocWhereUniqueInput
    update?: XOR<XOR<BaiHocUpdateToOneWithWhereWithoutCT_NguoiDung_BaiHocsInput, BaiHocUpdateWithoutCT_NguoiDung_BaiHocsInput>, BaiHocUncheckedUpdateWithoutCT_NguoiDung_BaiHocsInput>
  }

  export type LichSuChoiGameCreateNestedManyWithoutCauHoiGameInput = {
    create?: XOR<LichSuChoiGameCreateWithoutCauHoiGameInput, LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput> | LichSuChoiGameCreateWithoutCauHoiGameInput[] | LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput[]
    connectOrCreate?: LichSuChoiGameCreateOrConnectWithoutCauHoiGameInput | LichSuChoiGameCreateOrConnectWithoutCauHoiGameInput[]
    createMany?: LichSuChoiGameCreateManyCauHoiGameInputEnvelope
    connect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
  }

  export type LichSuChoiGameUncheckedCreateNestedManyWithoutCauHoiGameInput = {
    create?: XOR<LichSuChoiGameCreateWithoutCauHoiGameInput, LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput> | LichSuChoiGameCreateWithoutCauHoiGameInput[] | LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput[]
    connectOrCreate?: LichSuChoiGameCreateOrConnectWithoutCauHoiGameInput | LichSuChoiGameCreateOrConnectWithoutCauHoiGameInput[]
    createMany?: LichSuChoiGameCreateManyCauHoiGameInputEnvelope
    connect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
  }

  export type LichSuChoiGameUpdateManyWithoutCauHoiGameNestedInput = {
    create?: XOR<LichSuChoiGameCreateWithoutCauHoiGameInput, LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput> | LichSuChoiGameCreateWithoutCauHoiGameInput[] | LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput[]
    connectOrCreate?: LichSuChoiGameCreateOrConnectWithoutCauHoiGameInput | LichSuChoiGameCreateOrConnectWithoutCauHoiGameInput[]
    upsert?: LichSuChoiGameUpsertWithWhereUniqueWithoutCauHoiGameInput | LichSuChoiGameUpsertWithWhereUniqueWithoutCauHoiGameInput[]
    createMany?: LichSuChoiGameCreateManyCauHoiGameInputEnvelope
    set?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    disconnect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    delete?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    connect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    update?: LichSuChoiGameUpdateWithWhereUniqueWithoutCauHoiGameInput | LichSuChoiGameUpdateWithWhereUniqueWithoutCauHoiGameInput[]
    updateMany?: LichSuChoiGameUpdateManyWithWhereWithoutCauHoiGameInput | LichSuChoiGameUpdateManyWithWhereWithoutCauHoiGameInput[]
    deleteMany?: LichSuChoiGameScalarWhereInput | LichSuChoiGameScalarWhereInput[]
  }

  export type LichSuChoiGameUncheckedUpdateManyWithoutCauHoiGameNestedInput = {
    create?: XOR<LichSuChoiGameCreateWithoutCauHoiGameInput, LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput> | LichSuChoiGameCreateWithoutCauHoiGameInput[] | LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput[]
    connectOrCreate?: LichSuChoiGameCreateOrConnectWithoutCauHoiGameInput | LichSuChoiGameCreateOrConnectWithoutCauHoiGameInput[]
    upsert?: LichSuChoiGameUpsertWithWhereUniqueWithoutCauHoiGameInput | LichSuChoiGameUpsertWithWhereUniqueWithoutCauHoiGameInput[]
    createMany?: LichSuChoiGameCreateManyCauHoiGameInputEnvelope
    set?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    disconnect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    delete?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    connect?: LichSuChoiGameWhereUniqueInput | LichSuChoiGameWhereUniqueInput[]
    update?: LichSuChoiGameUpdateWithWhereUniqueWithoutCauHoiGameInput | LichSuChoiGameUpdateWithWhereUniqueWithoutCauHoiGameInput[]
    updateMany?: LichSuChoiGameUpdateManyWithWhereWithoutCauHoiGameInput | LichSuChoiGameUpdateManyWithWhereWithoutCauHoiGameInput[]
    deleteMany?: LichSuChoiGameScalarWhereInput | LichSuChoiGameScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutLichSuChoiGamesInput = {
    create?: XOR<UserCreateWithoutLichSuChoiGamesInput, UserUncheckedCreateWithoutLichSuChoiGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLichSuChoiGamesInput
    connect?: UserWhereUniqueInput
  }

  export type CauHoiGameCreateNestedOneWithoutLichSuChoiGamesInput = {
    create?: XOR<CauHoiGameCreateWithoutLichSuChoiGamesInput, CauHoiGameUncheckedCreateWithoutLichSuChoiGamesInput>
    connectOrCreate?: CauHoiGameCreateOrConnectWithoutLichSuChoiGamesInput
    connect?: CauHoiGameWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutLichSuChoiGamesNestedInput = {
    create?: XOR<UserCreateWithoutLichSuChoiGamesInput, UserUncheckedCreateWithoutLichSuChoiGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLichSuChoiGamesInput
    upsert?: UserUpsertWithoutLichSuChoiGamesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLichSuChoiGamesInput, UserUpdateWithoutLichSuChoiGamesInput>, UserUncheckedUpdateWithoutLichSuChoiGamesInput>
  }

  export type CauHoiGameUpdateOneRequiredWithoutLichSuChoiGamesNestedInput = {
    create?: XOR<CauHoiGameCreateWithoutLichSuChoiGamesInput, CauHoiGameUncheckedCreateWithoutLichSuChoiGamesInput>
    connectOrCreate?: CauHoiGameCreateOrConnectWithoutLichSuChoiGamesInput
    upsert?: CauHoiGameUpsertWithoutLichSuChoiGamesInput
    connect?: CauHoiGameWhereUniqueInput
    update?: XOR<XOR<CauHoiGameUpdateToOneWithWhereWithoutLichSuChoiGamesInput, CauHoiGameUpdateWithoutLichSuChoiGamesInput>, CauHoiGameUncheckedUpdateWithoutLichSuChoiGamesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BaiHocCreateWithoutKhoaHocInput = {
    TieuDe: string
    NoiDung?: string | null
    VideoUrl?: string | null
    HinhAnh?: string | null
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocCreateNestedManyWithoutBaiHocInput
  }

  export type BaiHocUncheckedCreateWithoutKhoaHocInput = {
    BaiHocId?: number
    TieuDe: string
    NoiDung?: string | null
    VideoUrl?: string | null
    HinhAnh?: string | null
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedCreateNestedManyWithoutBaiHocInput
  }

  export type BaiHocCreateOrConnectWithoutKhoaHocInput = {
    where: BaiHocWhereUniqueInput
    create: XOR<BaiHocCreateWithoutKhoaHocInput, BaiHocUncheckedCreateWithoutKhoaHocInput>
  }

  export type BaiHocCreateManyKhoaHocInputEnvelope = {
    data: BaiHocCreateManyKhoaHocInput | BaiHocCreateManyKhoaHocInput[]
    skipDuplicates?: boolean
  }

  export type CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput = {
    ngayCapNhat?: Date | string
    user: UserCreateNestedOneWithoutCT_NguoiDung_KhoaHocsInput
  }

  export type CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput = {
    id?: number
    userId: number
    ngayCapNhat?: Date | string
  }

  export type CT_NguoiDung_KhoaHocCreateOrConnectWithoutKhoaHocInput = {
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
    create: XOR<CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput>
  }

  export type CT_NguoiDung_KhoaHocCreateManyKhoaHocInputEnvelope = {
    data: CT_NguoiDung_KhoaHocCreateManyKhoaHocInput | CT_NguoiDung_KhoaHocCreateManyKhoaHocInput[]
    skipDuplicates?: boolean
  }

  export type BaiHocUpsertWithWhereUniqueWithoutKhoaHocInput = {
    where: BaiHocWhereUniqueInput
    update: XOR<BaiHocUpdateWithoutKhoaHocInput, BaiHocUncheckedUpdateWithoutKhoaHocInput>
    create: XOR<BaiHocCreateWithoutKhoaHocInput, BaiHocUncheckedCreateWithoutKhoaHocInput>
  }

  export type BaiHocUpdateWithWhereUniqueWithoutKhoaHocInput = {
    where: BaiHocWhereUniqueInput
    data: XOR<BaiHocUpdateWithoutKhoaHocInput, BaiHocUncheckedUpdateWithoutKhoaHocInput>
  }

  export type BaiHocUpdateManyWithWhereWithoutKhoaHocInput = {
    where: BaiHocScalarWhereInput
    data: XOR<BaiHocUpdateManyMutationInput, BaiHocUncheckedUpdateManyWithoutKhoaHocInput>
  }

  export type BaiHocScalarWhereInput = {
    AND?: BaiHocScalarWhereInput | BaiHocScalarWhereInput[]
    OR?: BaiHocScalarWhereInput[]
    NOT?: BaiHocScalarWhereInput | BaiHocScalarWhereInput[]
    BaiHocId?: IntFilter<"BaiHoc"> | number
    TieuDe?: StringFilter<"BaiHoc"> | string
    NoiDung?: StringNullableFilter<"BaiHoc"> | string | null
    VideoUrl?: StringNullableFilter<"BaiHoc"> | string | null
    HinhAnh?: StringNullableFilter<"BaiHoc"> | string | null
    KhoaHocId?: IntFilter<"BaiHoc"> | number
  }

  export type CT_NguoiDung_KhoaHocUpsertWithWhereUniqueWithoutKhoaHocInput = {
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
    update: XOR<CT_NguoiDung_KhoaHocUpdateWithoutKhoaHocInput, CT_NguoiDung_KhoaHocUncheckedUpdateWithoutKhoaHocInput>
    create: XOR<CT_NguoiDung_KhoaHocCreateWithoutKhoaHocInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutKhoaHocInput>
  }

  export type CT_NguoiDung_KhoaHocUpdateWithWhereUniqueWithoutKhoaHocInput = {
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
    data: XOR<CT_NguoiDung_KhoaHocUpdateWithoutKhoaHocInput, CT_NguoiDung_KhoaHocUncheckedUpdateWithoutKhoaHocInput>
  }

  export type CT_NguoiDung_KhoaHocUpdateManyWithWhereWithoutKhoaHocInput = {
    where: CT_NguoiDung_KhoaHocScalarWhereInput
    data: XOR<CT_NguoiDung_KhoaHocUpdateManyMutationInput, CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutKhoaHocInput>
  }

  export type CT_NguoiDung_KhoaHocScalarWhereInput = {
    AND?: CT_NguoiDung_KhoaHocScalarWhereInput | CT_NguoiDung_KhoaHocScalarWhereInput[]
    OR?: CT_NguoiDung_KhoaHocScalarWhereInput[]
    NOT?: CT_NguoiDung_KhoaHocScalarWhereInput | CT_NguoiDung_KhoaHocScalarWhereInput[]
    id?: IntFilter<"CT_NguoiDung_KhoaHoc"> | number
    userId?: IntFilter<"CT_NguoiDung_KhoaHoc"> | number
    khoaHocId?: IntFilter<"CT_NguoiDung_KhoaHoc"> | number
    ngayCapNhat?: DateTimeFilter<"CT_NguoiDung_KhoaHoc"> | Date | string
  }

  export type KhoaHocCreateWithoutBaiHocsInput = {
    TenKhoaHoc: string
    MoTa?: string | null
    Gia: number
    VideoUrl?: string | null
    HinhAnh?: string | null
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocCreateNestedManyWithoutKhoaHocInput
  }

  export type KhoaHocUncheckedCreateWithoutBaiHocsInput = {
    KhoaHocId?: number
    TenKhoaHoc: string
    MoTa?: string | null
    Gia: number
    VideoUrl?: string | null
    HinhAnh?: string | null
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedCreateNestedManyWithoutKhoaHocInput
  }

  export type KhoaHocCreateOrConnectWithoutBaiHocsInput = {
    where: KhoaHocWhereUniqueInput
    create: XOR<KhoaHocCreateWithoutBaiHocsInput, KhoaHocUncheckedCreateWithoutBaiHocsInput>
  }

  export type CT_NguoiDung_BaiHocCreateWithoutBaiHocInput = {
    ngayCapNhat?: Date | string
    user: UserCreateNestedOneWithoutCT_NguoiDung_BaiHocsInput
  }

  export type CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput = {
    id?: number
    userId: number
    ngayCapNhat?: Date | string
  }

  export type CT_NguoiDung_BaiHocCreateOrConnectWithoutBaiHocInput = {
    where: CT_NguoiDung_BaiHocWhereUniqueInput
    create: XOR<CT_NguoiDung_BaiHocCreateWithoutBaiHocInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput>
  }

  export type CT_NguoiDung_BaiHocCreateManyBaiHocInputEnvelope = {
    data: CT_NguoiDung_BaiHocCreateManyBaiHocInput | CT_NguoiDung_BaiHocCreateManyBaiHocInput[]
    skipDuplicates?: boolean
  }

  export type KhoaHocUpsertWithoutBaiHocsInput = {
    update: XOR<KhoaHocUpdateWithoutBaiHocsInput, KhoaHocUncheckedUpdateWithoutBaiHocsInput>
    create: XOR<KhoaHocCreateWithoutBaiHocsInput, KhoaHocUncheckedCreateWithoutBaiHocsInput>
    where?: KhoaHocWhereInput
  }

  export type KhoaHocUpdateToOneWithWhereWithoutBaiHocsInput = {
    where?: KhoaHocWhereInput
    data: XOR<KhoaHocUpdateWithoutBaiHocsInput, KhoaHocUncheckedUpdateWithoutBaiHocsInput>
  }

  export type KhoaHocUpdateWithoutBaiHocsInput = {
    TenKhoaHoc?: StringFieldUpdateOperationsInput | string
    MoTa?: NullableStringFieldUpdateOperationsInput | string | null
    Gia?: FloatFieldUpdateOperationsInput | number
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUpdateManyWithoutKhoaHocNestedInput
  }

  export type KhoaHocUncheckedUpdateWithoutBaiHocsInput = {
    KhoaHocId?: IntFieldUpdateOperationsInput | number
    TenKhoaHoc?: StringFieldUpdateOperationsInput | string
    MoTa?: NullableStringFieldUpdateOperationsInput | string | null
    Gia?: FloatFieldUpdateOperationsInput | number
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutKhoaHocNestedInput
  }

  export type CT_NguoiDung_BaiHocUpsertWithWhereUniqueWithoutBaiHocInput = {
    where: CT_NguoiDung_BaiHocWhereUniqueInput
    update: XOR<CT_NguoiDung_BaiHocUpdateWithoutBaiHocInput, CT_NguoiDung_BaiHocUncheckedUpdateWithoutBaiHocInput>
    create: XOR<CT_NguoiDung_BaiHocCreateWithoutBaiHocInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutBaiHocInput>
  }

  export type CT_NguoiDung_BaiHocUpdateWithWhereUniqueWithoutBaiHocInput = {
    where: CT_NguoiDung_BaiHocWhereUniqueInput
    data: XOR<CT_NguoiDung_BaiHocUpdateWithoutBaiHocInput, CT_NguoiDung_BaiHocUncheckedUpdateWithoutBaiHocInput>
  }

  export type CT_NguoiDung_BaiHocUpdateManyWithWhereWithoutBaiHocInput = {
    where: CT_NguoiDung_BaiHocScalarWhereInput
    data: XOR<CT_NguoiDung_BaiHocUpdateManyMutationInput, CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutBaiHocInput>
  }

  export type CT_NguoiDung_BaiHocScalarWhereInput = {
    AND?: CT_NguoiDung_BaiHocScalarWhereInput | CT_NguoiDung_BaiHocScalarWhereInput[]
    OR?: CT_NguoiDung_BaiHocScalarWhereInput[]
    NOT?: CT_NguoiDung_BaiHocScalarWhereInput | CT_NguoiDung_BaiHocScalarWhereInput[]
    id?: IntFilter<"CT_NguoiDung_BaiHoc"> | number
    userId?: IntFilter<"CT_NguoiDung_BaiHoc"> | number
    baiHocId?: IntFilter<"CT_NguoiDung_BaiHoc"> | number
    ngayCapNhat?: DateTimeFilter<"CT_NguoiDung_BaiHoc"> | Date | string
  }

  export type UserRoleCreateWithoutUserInput = {
    role: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserRoleUncheckedCreateWithoutUserInput = {
    id?: number
    roleId: number
  }

  export type UserRoleCreateOrConnectWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleCreateManyUserInputEnvelope = {
    data: UserRoleCreateManyUserInput | UserRoleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CT_NguoiDung_KhoaHocCreateWithoutUserInput = {
    ngayCapNhat?: Date | string
    khoaHoc: KhoaHocCreateNestedOneWithoutCT_NguoiDung_KhoaHocsInput
  }

  export type CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput = {
    id?: number
    khoaHocId: number
    ngayCapNhat?: Date | string
  }

  export type CT_NguoiDung_KhoaHocCreateOrConnectWithoutUserInput = {
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
    create: XOR<CT_NguoiDung_KhoaHocCreateWithoutUserInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput>
  }

  export type CT_NguoiDung_KhoaHocCreateManyUserInputEnvelope = {
    data: CT_NguoiDung_KhoaHocCreateManyUserInput | CT_NguoiDung_KhoaHocCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CT_NguoiDung_BaiHocCreateWithoutUserInput = {
    ngayCapNhat?: Date | string
    baiHoc: BaiHocCreateNestedOneWithoutCT_NguoiDung_BaiHocsInput
  }

  export type CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput = {
    id?: number
    baiHocId: number
    ngayCapNhat?: Date | string
  }

  export type CT_NguoiDung_BaiHocCreateOrConnectWithoutUserInput = {
    where: CT_NguoiDung_BaiHocWhereUniqueInput
    create: XOR<CT_NguoiDung_BaiHocCreateWithoutUserInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput>
  }

  export type CT_NguoiDung_BaiHocCreateManyUserInputEnvelope = {
    data: CT_NguoiDung_BaiHocCreateManyUserInput | CT_NguoiDung_BaiHocCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LichSuChoiGameCreateWithoutUserInput = {
    dapAnNguoiDung: string
    dung: boolean
    thoiGianTraLoi: number
    thoiGian?: Date | string
    cauHoiGame: CauHoiGameCreateNestedOneWithoutLichSuChoiGamesInput
  }

  export type LichSuChoiGameUncheckedCreateWithoutUserInput = {
    id?: number
    cauHoiId: number
    dapAnNguoiDung: string
    dung: boolean
    thoiGianTraLoi: number
    thoiGian?: Date | string
  }

  export type LichSuChoiGameCreateOrConnectWithoutUserInput = {
    where: LichSuChoiGameWhereUniqueInput
    create: XOR<LichSuChoiGameCreateWithoutUserInput, LichSuChoiGameUncheckedCreateWithoutUserInput>
  }

  export type LichSuChoiGameCreateManyUserInputEnvelope = {
    data: LichSuChoiGameCreateManyUserInput | LichSuChoiGameCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserRoleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutUserInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRoleScalarWhereInput = {
    AND?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
    OR?: UserRoleScalarWhereInput[]
    NOT?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
    id?: IntFilter<"UserRole"> | number
    userId?: IntFilter<"UserRole"> | number
    roleId?: IntFilter<"UserRole"> | number
  }

  export type CT_NguoiDung_KhoaHocUpsertWithWhereUniqueWithoutUserInput = {
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
    update: XOR<CT_NguoiDung_KhoaHocUpdateWithoutUserInput, CT_NguoiDung_KhoaHocUncheckedUpdateWithoutUserInput>
    create: XOR<CT_NguoiDung_KhoaHocCreateWithoutUserInput, CT_NguoiDung_KhoaHocUncheckedCreateWithoutUserInput>
  }

  export type CT_NguoiDung_KhoaHocUpdateWithWhereUniqueWithoutUserInput = {
    where: CT_NguoiDung_KhoaHocWhereUniqueInput
    data: XOR<CT_NguoiDung_KhoaHocUpdateWithoutUserInput, CT_NguoiDung_KhoaHocUncheckedUpdateWithoutUserInput>
  }

  export type CT_NguoiDung_KhoaHocUpdateManyWithWhereWithoutUserInput = {
    where: CT_NguoiDung_KhoaHocScalarWhereInput
    data: XOR<CT_NguoiDung_KhoaHocUpdateManyMutationInput, CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutUserInput>
  }

  export type CT_NguoiDung_BaiHocUpsertWithWhereUniqueWithoutUserInput = {
    where: CT_NguoiDung_BaiHocWhereUniqueInput
    update: XOR<CT_NguoiDung_BaiHocUpdateWithoutUserInput, CT_NguoiDung_BaiHocUncheckedUpdateWithoutUserInput>
    create: XOR<CT_NguoiDung_BaiHocCreateWithoutUserInput, CT_NguoiDung_BaiHocUncheckedCreateWithoutUserInput>
  }

  export type CT_NguoiDung_BaiHocUpdateWithWhereUniqueWithoutUserInput = {
    where: CT_NguoiDung_BaiHocWhereUniqueInput
    data: XOR<CT_NguoiDung_BaiHocUpdateWithoutUserInput, CT_NguoiDung_BaiHocUncheckedUpdateWithoutUserInput>
  }

  export type CT_NguoiDung_BaiHocUpdateManyWithWhereWithoutUserInput = {
    where: CT_NguoiDung_BaiHocScalarWhereInput
    data: XOR<CT_NguoiDung_BaiHocUpdateManyMutationInput, CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutUserInput>
  }

  export type LichSuChoiGameUpsertWithWhereUniqueWithoutUserInput = {
    where: LichSuChoiGameWhereUniqueInput
    update: XOR<LichSuChoiGameUpdateWithoutUserInput, LichSuChoiGameUncheckedUpdateWithoutUserInput>
    create: XOR<LichSuChoiGameCreateWithoutUserInput, LichSuChoiGameUncheckedCreateWithoutUserInput>
  }

  export type LichSuChoiGameUpdateWithWhereUniqueWithoutUserInput = {
    where: LichSuChoiGameWhereUniqueInput
    data: XOR<LichSuChoiGameUpdateWithoutUserInput, LichSuChoiGameUncheckedUpdateWithoutUserInput>
  }

  export type LichSuChoiGameUpdateManyWithWhereWithoutUserInput = {
    where: LichSuChoiGameScalarWhereInput
    data: XOR<LichSuChoiGameUpdateManyMutationInput, LichSuChoiGameUncheckedUpdateManyWithoutUserInput>
  }

  export type LichSuChoiGameScalarWhereInput = {
    AND?: LichSuChoiGameScalarWhereInput | LichSuChoiGameScalarWhereInput[]
    OR?: LichSuChoiGameScalarWhereInput[]
    NOT?: LichSuChoiGameScalarWhereInput | LichSuChoiGameScalarWhereInput[]
    id?: IntFilter<"LichSuChoiGame"> | number
    userId?: IntFilter<"LichSuChoiGame"> | number
    cauHoiId?: IntFilter<"LichSuChoiGame"> | number
    dapAnNguoiDung?: StringFilter<"LichSuChoiGame"> | string
    dung?: BoolFilter<"LichSuChoiGame"> | boolean
    thoiGianTraLoi?: IntFilter<"LichSuChoiGame"> | number
    thoiGian?: DateTimeFilter<"LichSuChoiGame"> | Date | string
  }

  export type RoleClaimCreateWithoutRoleInput = {
    claim: string
  }

  export type RoleClaimUncheckedCreateWithoutRoleInput = {
    id?: number
    claim: string
  }

  export type RoleClaimCreateOrConnectWithoutRoleInput = {
    where: RoleClaimWhereUniqueInput
    create: XOR<RoleClaimCreateWithoutRoleInput, RoleClaimUncheckedCreateWithoutRoleInput>
  }

  export type RoleClaimCreateManyRoleInputEnvelope = {
    data: RoleClaimCreateManyRoleInput | RoleClaimCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserRoleCreateWithoutRoleInput = {
    user: UserCreateNestedOneWithoutRolesInput
  }

  export type UserRoleUncheckedCreateWithoutRoleInput = {
    id?: number
    userId: number
  }

  export type UserRoleCreateOrConnectWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleCreateManyRoleInputEnvelope = {
    data: UserRoleCreateManyRoleInput | UserRoleCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type RoleClaimUpsertWithWhereUniqueWithoutRoleInput = {
    where: RoleClaimWhereUniqueInput
    update: XOR<RoleClaimUpdateWithoutRoleInput, RoleClaimUncheckedUpdateWithoutRoleInput>
    create: XOR<RoleClaimCreateWithoutRoleInput, RoleClaimUncheckedCreateWithoutRoleInput>
  }

  export type RoleClaimUpdateWithWhereUniqueWithoutRoleInput = {
    where: RoleClaimWhereUniqueInput
    data: XOR<RoleClaimUpdateWithoutRoleInput, RoleClaimUncheckedUpdateWithoutRoleInput>
  }

  export type RoleClaimUpdateManyWithWhereWithoutRoleInput = {
    where: RoleClaimScalarWhereInput
    data: XOR<RoleClaimUpdateManyMutationInput, RoleClaimUncheckedUpdateManyWithoutRoleInput>
  }

  export type RoleClaimScalarWhereInput = {
    AND?: RoleClaimScalarWhereInput | RoleClaimScalarWhereInput[]
    OR?: RoleClaimScalarWhereInput[]
    NOT?: RoleClaimScalarWhereInput | RoleClaimScalarWhereInput[]
    id?: IntFilter<"RoleClaim"> | number
    roleId?: IntFilter<"RoleClaim"> | number
    claim?: StringFilter<"RoleClaim"> | string
  }

  export type UserRoleUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutRoleInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserCreateWithoutRolesInput = {
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocCreateNestedManyWithoutUserInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocCreateNestedManyWithoutUserInput
    lichSuChoiGames?: LichSuChoiGameCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRolesInput = {
    id?: number
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedCreateNestedManyWithoutUserInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedCreateNestedManyWithoutUserInput
    lichSuChoiGames?: LichSuChoiGameUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRolesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
  }

  export type RoleCreateWithoutUsersInput = {
    name: string
    claims?: RoleClaimCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    claims?: RoleClaimUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutRolesInput = {
    update: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
    create: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRolesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
  }

  export type UserUpdateWithoutRolesInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUpdateManyWithoutUserNestedInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUpdateManyWithoutUserNestedInput
    lichSuChoiGames?: LichSuChoiGameUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRolesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutUserNestedInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutUserNestedInput
    lichSuChoiGames?: LichSuChoiGameUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    claims?: RoleClaimUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    claims?: RoleClaimUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateWithoutClaimsInput = {
    name: string
    users?: UserRoleCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutClaimsInput = {
    id?: number
    name: string
    users?: UserRoleUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutClaimsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutClaimsInput, RoleUncheckedCreateWithoutClaimsInput>
  }

  export type RoleUpsertWithoutClaimsInput = {
    update: XOR<RoleUpdateWithoutClaimsInput, RoleUncheckedUpdateWithoutClaimsInput>
    create: XOR<RoleCreateWithoutClaimsInput, RoleUncheckedCreateWithoutClaimsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutClaimsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutClaimsInput, RoleUncheckedUpdateWithoutClaimsInput>
  }

  export type RoleUpdateWithoutClaimsInput = {
    name?: StringFieldUpdateOperationsInput | string
    users?: UserRoleUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutClaimsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    users?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type UserCreateWithoutCT_NguoiDung_KhoaHocsInput = {
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    roles?: UserRoleCreateNestedManyWithoutUserInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocCreateNestedManyWithoutUserInput
    lichSuChoiGames?: LichSuChoiGameCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCT_NguoiDung_KhoaHocsInput = {
    id?: number
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedCreateNestedManyWithoutUserInput
    lichSuChoiGames?: LichSuChoiGameUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCT_NguoiDung_KhoaHocsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCT_NguoiDung_KhoaHocsInput, UserUncheckedCreateWithoutCT_NguoiDung_KhoaHocsInput>
  }

  export type KhoaHocCreateWithoutCT_NguoiDung_KhoaHocsInput = {
    TenKhoaHoc: string
    MoTa?: string | null
    Gia: number
    VideoUrl?: string | null
    HinhAnh?: string | null
    baiHocs?: BaiHocCreateNestedManyWithoutKhoaHocInput
  }

  export type KhoaHocUncheckedCreateWithoutCT_NguoiDung_KhoaHocsInput = {
    KhoaHocId?: number
    TenKhoaHoc: string
    MoTa?: string | null
    Gia: number
    VideoUrl?: string | null
    HinhAnh?: string | null
    baiHocs?: BaiHocUncheckedCreateNestedManyWithoutKhoaHocInput
  }

  export type KhoaHocCreateOrConnectWithoutCT_NguoiDung_KhoaHocsInput = {
    where: KhoaHocWhereUniqueInput
    create: XOR<KhoaHocCreateWithoutCT_NguoiDung_KhoaHocsInput, KhoaHocUncheckedCreateWithoutCT_NguoiDung_KhoaHocsInput>
  }

  export type UserUpsertWithoutCT_NguoiDung_KhoaHocsInput = {
    update: XOR<UserUpdateWithoutCT_NguoiDung_KhoaHocsInput, UserUncheckedUpdateWithoutCT_NguoiDung_KhoaHocsInput>
    create: XOR<UserCreateWithoutCT_NguoiDung_KhoaHocsInput, UserUncheckedCreateWithoutCT_NguoiDung_KhoaHocsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCT_NguoiDung_KhoaHocsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCT_NguoiDung_KhoaHocsInput, UserUncheckedUpdateWithoutCT_NguoiDung_KhoaHocsInput>
  }

  export type UserUpdateWithoutCT_NguoiDung_KhoaHocsInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roles?: UserRoleUpdateManyWithoutUserNestedInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUpdateManyWithoutUserNestedInput
    lichSuChoiGames?: LichSuChoiGameUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCT_NguoiDung_KhoaHocsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutUserNestedInput
    lichSuChoiGames?: LichSuChoiGameUncheckedUpdateManyWithoutUserNestedInput
  }

  export type KhoaHocUpsertWithoutCT_NguoiDung_KhoaHocsInput = {
    update: XOR<KhoaHocUpdateWithoutCT_NguoiDung_KhoaHocsInput, KhoaHocUncheckedUpdateWithoutCT_NguoiDung_KhoaHocsInput>
    create: XOR<KhoaHocCreateWithoutCT_NguoiDung_KhoaHocsInput, KhoaHocUncheckedCreateWithoutCT_NguoiDung_KhoaHocsInput>
    where?: KhoaHocWhereInput
  }

  export type KhoaHocUpdateToOneWithWhereWithoutCT_NguoiDung_KhoaHocsInput = {
    where?: KhoaHocWhereInput
    data: XOR<KhoaHocUpdateWithoutCT_NguoiDung_KhoaHocsInput, KhoaHocUncheckedUpdateWithoutCT_NguoiDung_KhoaHocsInput>
  }

  export type KhoaHocUpdateWithoutCT_NguoiDung_KhoaHocsInput = {
    TenKhoaHoc?: StringFieldUpdateOperationsInput | string
    MoTa?: NullableStringFieldUpdateOperationsInput | string | null
    Gia?: FloatFieldUpdateOperationsInput | number
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    baiHocs?: BaiHocUpdateManyWithoutKhoaHocNestedInput
  }

  export type KhoaHocUncheckedUpdateWithoutCT_NguoiDung_KhoaHocsInput = {
    KhoaHocId?: IntFieldUpdateOperationsInput | number
    TenKhoaHoc?: StringFieldUpdateOperationsInput | string
    MoTa?: NullableStringFieldUpdateOperationsInput | string | null
    Gia?: FloatFieldUpdateOperationsInput | number
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    baiHocs?: BaiHocUncheckedUpdateManyWithoutKhoaHocNestedInput
  }

  export type UserCreateWithoutCT_NguoiDung_BaiHocsInput = {
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    roles?: UserRoleCreateNestedManyWithoutUserInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocCreateNestedManyWithoutUserInput
    lichSuChoiGames?: LichSuChoiGameCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCT_NguoiDung_BaiHocsInput = {
    id?: number
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedCreateNestedManyWithoutUserInput
    lichSuChoiGames?: LichSuChoiGameUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCT_NguoiDung_BaiHocsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCT_NguoiDung_BaiHocsInput, UserUncheckedCreateWithoutCT_NguoiDung_BaiHocsInput>
  }

  export type BaiHocCreateWithoutCT_NguoiDung_BaiHocsInput = {
    TieuDe: string
    NoiDung?: string | null
    VideoUrl?: string | null
    HinhAnh?: string | null
    KhoaHoc: KhoaHocCreateNestedOneWithoutBaiHocsInput
  }

  export type BaiHocUncheckedCreateWithoutCT_NguoiDung_BaiHocsInput = {
    BaiHocId?: number
    TieuDe: string
    NoiDung?: string | null
    VideoUrl?: string | null
    HinhAnh?: string | null
    KhoaHocId: number
  }

  export type BaiHocCreateOrConnectWithoutCT_NguoiDung_BaiHocsInput = {
    where: BaiHocWhereUniqueInput
    create: XOR<BaiHocCreateWithoutCT_NguoiDung_BaiHocsInput, BaiHocUncheckedCreateWithoutCT_NguoiDung_BaiHocsInput>
  }

  export type UserUpsertWithoutCT_NguoiDung_BaiHocsInput = {
    update: XOR<UserUpdateWithoutCT_NguoiDung_BaiHocsInput, UserUncheckedUpdateWithoutCT_NguoiDung_BaiHocsInput>
    create: XOR<UserCreateWithoutCT_NguoiDung_BaiHocsInput, UserUncheckedCreateWithoutCT_NguoiDung_BaiHocsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCT_NguoiDung_BaiHocsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCT_NguoiDung_BaiHocsInput, UserUncheckedUpdateWithoutCT_NguoiDung_BaiHocsInput>
  }

  export type UserUpdateWithoutCT_NguoiDung_BaiHocsInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roles?: UserRoleUpdateManyWithoutUserNestedInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUpdateManyWithoutUserNestedInput
    lichSuChoiGames?: LichSuChoiGameUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCT_NguoiDung_BaiHocsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutUserNestedInput
    lichSuChoiGames?: LichSuChoiGameUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BaiHocUpsertWithoutCT_NguoiDung_BaiHocsInput = {
    update: XOR<BaiHocUpdateWithoutCT_NguoiDung_BaiHocsInput, BaiHocUncheckedUpdateWithoutCT_NguoiDung_BaiHocsInput>
    create: XOR<BaiHocCreateWithoutCT_NguoiDung_BaiHocsInput, BaiHocUncheckedCreateWithoutCT_NguoiDung_BaiHocsInput>
    where?: BaiHocWhereInput
  }

  export type BaiHocUpdateToOneWithWhereWithoutCT_NguoiDung_BaiHocsInput = {
    where?: BaiHocWhereInput
    data: XOR<BaiHocUpdateWithoutCT_NguoiDung_BaiHocsInput, BaiHocUncheckedUpdateWithoutCT_NguoiDung_BaiHocsInput>
  }

  export type BaiHocUpdateWithoutCT_NguoiDung_BaiHocsInput = {
    TieuDe?: StringFieldUpdateOperationsInput | string
    NoiDung?: NullableStringFieldUpdateOperationsInput | string | null
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    KhoaHoc?: KhoaHocUpdateOneRequiredWithoutBaiHocsNestedInput
  }

  export type BaiHocUncheckedUpdateWithoutCT_NguoiDung_BaiHocsInput = {
    BaiHocId?: IntFieldUpdateOperationsInput | number
    TieuDe?: StringFieldUpdateOperationsInput | string
    NoiDung?: NullableStringFieldUpdateOperationsInput | string | null
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    KhoaHocId?: IntFieldUpdateOperationsInput | number
  }

  export type LichSuChoiGameCreateWithoutCauHoiGameInput = {
    dapAnNguoiDung: string
    dung: boolean
    thoiGianTraLoi: number
    thoiGian?: Date | string
    user: UserCreateNestedOneWithoutLichSuChoiGamesInput
  }

  export type LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput = {
    id?: number
    userId: number
    dapAnNguoiDung: string
    dung: boolean
    thoiGianTraLoi: number
    thoiGian?: Date | string
  }

  export type LichSuChoiGameCreateOrConnectWithoutCauHoiGameInput = {
    where: LichSuChoiGameWhereUniqueInput
    create: XOR<LichSuChoiGameCreateWithoutCauHoiGameInput, LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput>
  }

  export type LichSuChoiGameCreateManyCauHoiGameInputEnvelope = {
    data: LichSuChoiGameCreateManyCauHoiGameInput | LichSuChoiGameCreateManyCauHoiGameInput[]
    skipDuplicates?: boolean
  }

  export type LichSuChoiGameUpsertWithWhereUniqueWithoutCauHoiGameInput = {
    where: LichSuChoiGameWhereUniqueInput
    update: XOR<LichSuChoiGameUpdateWithoutCauHoiGameInput, LichSuChoiGameUncheckedUpdateWithoutCauHoiGameInput>
    create: XOR<LichSuChoiGameCreateWithoutCauHoiGameInput, LichSuChoiGameUncheckedCreateWithoutCauHoiGameInput>
  }

  export type LichSuChoiGameUpdateWithWhereUniqueWithoutCauHoiGameInput = {
    where: LichSuChoiGameWhereUniqueInput
    data: XOR<LichSuChoiGameUpdateWithoutCauHoiGameInput, LichSuChoiGameUncheckedUpdateWithoutCauHoiGameInput>
  }

  export type LichSuChoiGameUpdateManyWithWhereWithoutCauHoiGameInput = {
    where: LichSuChoiGameScalarWhereInput
    data: XOR<LichSuChoiGameUpdateManyMutationInput, LichSuChoiGameUncheckedUpdateManyWithoutCauHoiGameInput>
  }

  export type UserCreateWithoutLichSuChoiGamesInput = {
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    roles?: UserRoleCreateNestedManyWithoutUserInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocCreateNestedManyWithoutUserInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLichSuChoiGamesInput = {
    id?: number
    email: string
    fullname: string
    sex: string
    phonenumber: string
    password: string
    roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedCreateNestedManyWithoutUserInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLichSuChoiGamesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLichSuChoiGamesInput, UserUncheckedCreateWithoutLichSuChoiGamesInput>
  }

  export type CauHoiGameCreateWithoutLichSuChoiGamesInput = {
    noiDung: string
    dapAn: string
    capDo?: string | null
    chuDe?: string | null
    createdAt?: Date | string
  }

  export type CauHoiGameUncheckedCreateWithoutLichSuChoiGamesInput = {
    id?: number
    noiDung: string
    dapAn: string
    capDo?: string | null
    chuDe?: string | null
    createdAt?: Date | string
  }

  export type CauHoiGameCreateOrConnectWithoutLichSuChoiGamesInput = {
    where: CauHoiGameWhereUniqueInput
    create: XOR<CauHoiGameCreateWithoutLichSuChoiGamesInput, CauHoiGameUncheckedCreateWithoutLichSuChoiGamesInput>
  }

  export type UserUpsertWithoutLichSuChoiGamesInput = {
    update: XOR<UserUpdateWithoutLichSuChoiGamesInput, UserUncheckedUpdateWithoutLichSuChoiGamesInput>
    create: XOR<UserCreateWithoutLichSuChoiGamesInput, UserUncheckedCreateWithoutLichSuChoiGamesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLichSuChoiGamesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLichSuChoiGamesInput, UserUncheckedUpdateWithoutLichSuChoiGamesInput>
  }

  export type UserUpdateWithoutLichSuChoiGamesInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roles?: UserRoleUpdateManyWithoutUserNestedInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUpdateManyWithoutUserNestedInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLichSuChoiGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    phonenumber?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    CT_NguoiDung_KhoaHocs?: CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutUserNestedInput
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CauHoiGameUpsertWithoutLichSuChoiGamesInput = {
    update: XOR<CauHoiGameUpdateWithoutLichSuChoiGamesInput, CauHoiGameUncheckedUpdateWithoutLichSuChoiGamesInput>
    create: XOR<CauHoiGameCreateWithoutLichSuChoiGamesInput, CauHoiGameUncheckedCreateWithoutLichSuChoiGamesInput>
    where?: CauHoiGameWhereInput
  }

  export type CauHoiGameUpdateToOneWithWhereWithoutLichSuChoiGamesInput = {
    where?: CauHoiGameWhereInput
    data: XOR<CauHoiGameUpdateWithoutLichSuChoiGamesInput, CauHoiGameUncheckedUpdateWithoutLichSuChoiGamesInput>
  }

  export type CauHoiGameUpdateWithoutLichSuChoiGamesInput = {
    noiDung?: StringFieldUpdateOperationsInput | string
    dapAn?: StringFieldUpdateOperationsInput | string
    capDo?: NullableStringFieldUpdateOperationsInput | string | null
    chuDe?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CauHoiGameUncheckedUpdateWithoutLichSuChoiGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    noiDung?: StringFieldUpdateOperationsInput | string
    dapAn?: StringFieldUpdateOperationsInput | string
    capDo?: NullableStringFieldUpdateOperationsInput | string | null
    chuDe?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BaiHocCreateManyKhoaHocInput = {
    BaiHocId?: number
    TieuDe: string
    NoiDung?: string | null
    VideoUrl?: string | null
    HinhAnh?: string | null
  }

  export type CT_NguoiDung_KhoaHocCreateManyKhoaHocInput = {
    id?: number
    userId: number
    ngayCapNhat?: Date | string
  }

  export type BaiHocUpdateWithoutKhoaHocInput = {
    TieuDe?: StringFieldUpdateOperationsInput | string
    NoiDung?: NullableStringFieldUpdateOperationsInput | string | null
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUpdateManyWithoutBaiHocNestedInput
  }

  export type BaiHocUncheckedUpdateWithoutKhoaHocInput = {
    BaiHocId?: IntFieldUpdateOperationsInput | number
    TieuDe?: StringFieldUpdateOperationsInput | string
    NoiDung?: NullableStringFieldUpdateOperationsInput | string | null
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
    CT_NguoiDung_BaiHocs?: CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutBaiHocNestedInput
  }

  export type BaiHocUncheckedUpdateManyWithoutKhoaHocInput = {
    BaiHocId?: IntFieldUpdateOperationsInput | number
    TieuDe?: StringFieldUpdateOperationsInput | string
    NoiDung?: NullableStringFieldUpdateOperationsInput | string | null
    VideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    HinhAnh?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CT_NguoiDung_KhoaHocUpdateWithoutKhoaHocInput = {
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCT_NguoiDung_KhoaHocsNestedInput
  }

  export type CT_NguoiDung_KhoaHocUncheckedUpdateWithoutKhoaHocInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutKhoaHocInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_BaiHocCreateManyBaiHocInput = {
    id?: number
    userId: number
    ngayCapNhat?: Date | string
  }

  export type CT_NguoiDung_BaiHocUpdateWithoutBaiHocInput = {
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCT_NguoiDung_BaiHocsNestedInput
  }

  export type CT_NguoiDung_BaiHocUncheckedUpdateWithoutBaiHocInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutBaiHocInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleCreateManyUserInput = {
    id?: number
    roleId: number
  }

  export type CT_NguoiDung_KhoaHocCreateManyUserInput = {
    id?: number
    khoaHocId: number
    ngayCapNhat?: Date | string
  }

  export type CT_NguoiDung_BaiHocCreateManyUserInput = {
    id?: number
    baiHocId: number
    ngayCapNhat?: Date | string
  }

  export type LichSuChoiGameCreateManyUserInput = {
    id?: number
    cauHoiId: number
    dapAnNguoiDung: string
    dung: boolean
    thoiGianTraLoi: number
    thoiGian?: Date | string
  }

  export type UserRoleUpdateWithoutUserInput = {
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserRoleUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
  }

  export type UserRoleUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    roleId?: IntFieldUpdateOperationsInput | number
  }

  export type CT_NguoiDung_KhoaHocUpdateWithoutUserInput = {
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
    khoaHoc?: KhoaHocUpdateOneRequiredWithoutCT_NguoiDung_KhoaHocsNestedInput
  }

  export type CT_NguoiDung_KhoaHocUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    khoaHocId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_KhoaHocUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    khoaHocId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_BaiHocUpdateWithoutUserInput = {
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
    baiHoc?: BaiHocUpdateOneRequiredWithoutCT_NguoiDung_BaiHocsNestedInput
  }

  export type CT_NguoiDung_BaiHocUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    baiHocId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CT_NguoiDung_BaiHocUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    baiHocId?: IntFieldUpdateOperationsInput | number
    ngayCapNhat?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LichSuChoiGameUpdateWithoutUserInput = {
    dapAnNguoiDung?: StringFieldUpdateOperationsInput | string
    dung?: BoolFieldUpdateOperationsInput | boolean
    thoiGianTraLoi?: IntFieldUpdateOperationsInput | number
    thoiGian?: DateTimeFieldUpdateOperationsInput | Date | string
    cauHoiGame?: CauHoiGameUpdateOneRequiredWithoutLichSuChoiGamesNestedInput
  }

  export type LichSuChoiGameUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    cauHoiId?: IntFieldUpdateOperationsInput | number
    dapAnNguoiDung?: StringFieldUpdateOperationsInput | string
    dung?: BoolFieldUpdateOperationsInput | boolean
    thoiGianTraLoi?: IntFieldUpdateOperationsInput | number
    thoiGian?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LichSuChoiGameUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    cauHoiId?: IntFieldUpdateOperationsInput | number
    dapAnNguoiDung?: StringFieldUpdateOperationsInput | string
    dung?: BoolFieldUpdateOperationsInput | boolean
    thoiGianTraLoi?: IntFieldUpdateOperationsInput | number
    thoiGian?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleClaimCreateManyRoleInput = {
    id?: number
    claim: string
  }

  export type UserRoleCreateManyRoleInput = {
    id?: number
    userId: number
  }

  export type RoleClaimUpdateWithoutRoleInput = {
    claim?: StringFieldUpdateOperationsInput | string
  }

  export type RoleClaimUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    claim?: StringFieldUpdateOperationsInput | string
  }

  export type RoleClaimUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    claim?: StringFieldUpdateOperationsInput | string
  }

  export type UserRoleUpdateWithoutRoleInput = {
    user?: UserUpdateOneRequiredWithoutRolesNestedInput
  }

  export type UserRoleUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type LichSuChoiGameCreateManyCauHoiGameInput = {
    id?: number
    userId: number
    dapAnNguoiDung: string
    dung: boolean
    thoiGianTraLoi: number
    thoiGian?: Date | string
  }

  export type LichSuChoiGameUpdateWithoutCauHoiGameInput = {
    dapAnNguoiDung?: StringFieldUpdateOperationsInput | string
    dung?: BoolFieldUpdateOperationsInput | boolean
    thoiGianTraLoi?: IntFieldUpdateOperationsInput | number
    thoiGian?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLichSuChoiGamesNestedInput
  }

  export type LichSuChoiGameUncheckedUpdateWithoutCauHoiGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    dapAnNguoiDung?: StringFieldUpdateOperationsInput | string
    dung?: BoolFieldUpdateOperationsInput | boolean
    thoiGianTraLoi?: IntFieldUpdateOperationsInput | number
    thoiGian?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LichSuChoiGameUncheckedUpdateManyWithoutCauHoiGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    dapAnNguoiDung?: StringFieldUpdateOperationsInput | string
    dung?: BoolFieldUpdateOperationsInput | boolean
    thoiGianTraLoi?: IntFieldUpdateOperationsInput | number
    thoiGian?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}