# fooding-node

길거리 음식 검색 사이트

## How to use

> ### Prerequisite
> * MySQL
> * .env file
>   * Set .env-sample file and Rename to **.env**
> * config/config.json
>   * Set config/config-sample.json file to your database
>   * Rename config/config-sample.json to **config/config.json**

> ### Windows 10
> ```sh
> # Start database service
> $ net start (your database service name)
> ```

```sh
# Start database service
$ npm i
$ npm i -g sequlize-cli
$ sequelize db:create
$ npm start
```
