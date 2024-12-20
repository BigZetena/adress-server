﻿Конечно! Вот обновленный раздел документации с добавлением информации о том, как удалить контакт:

---

## Address API

Это простой API на Express.js, предоставляющий данные о контактах. Пользователи могут искать определенные контакты, добавлять новые контакты с загрузкой изображений и удалять существующие контакты.

### Особенности

- Получение контактов на основе поискового запроса.
- Добавление нового контакта с загрузкой изображения.
- Удаление контакта.

## Установка

1. Клонировать репозиторий:

   ```bash
   git clone [repository-url]
   ```

2. Перейти в директорию проекта:

   ```bash
   cd [project-directory]
   ```

3. Установить зависимости:

   ```bash
   npm install
   ```

4. Запустить сервер:

   ```bash
   npm start
   ```

Сервер запустится на порту `3000` по умолчанию. Вы можете изменить порт в константе `PORT` в файле `index.js`.

## Конечные точки (Endpoints)

### GET `/contacts`

#### Параметры запроса:

| Параметр | Описание                                                                                                                 | По умолчанию  |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `search` | Строка поиска для фильтрации контактов по имени, фамилии, телефону, почте или описанию                                   | Пустая строка |
| `gender` | Фильтрация по гендеру (`male` или `female`)                                                                              | Пустая строка |
| `filter` | Сортировка результатов (`a-z` для сортировки по имени от A до Z, `z` для Z до A, `date` для сортировки по дате создания) | `a-z`         |

#### Ответ:

Конечная точка возвращает JSON-объект с массивом контактов.

Пример:

```json
{
  "data": [
    {
      "id": 1,
      "name": "John",
      "surname": "Doe",
      "about": "Some information about John",
      "mail": "john.doe@example.com",
      "phone": "1234567890",
      "gender": "male",
      "image": "image-16234234234.jpg",
      "creationDate": "2024-07-08T12:00:00.000Z"
    },
    ...
  ]
}
```

### POST `/contacts`

#### Параметры запроса:

| Параметр  | Описание                    |
| --------- | --------------------------- |
| `name`    | Имя контакта                |
| `surname` | Фамилия контакта            |
| `about`   | Описание контакта           |
| `mail`    | Почта контакта              |
| `phone`   | Телефон контакта            |
| `gender`  | Гендер контакта             |
| `image`   | Изображение контакта (файл) |

#### Пример запроса:

Отправьте запрос с типом `form-data` с полями, указанными выше, в Postman или любом другом инструменте для отправки HTTP-запросов.

Пример запроса в Postman:

```
POST https://std.bit-camp.ru/contacts
Content-Type: multipart/form-data

{
    "name": "Jane",
    "surname": "Doe",
    "about": "Some information about Jane",
    "mail": "jane.doe@example.com",
    "phone": "0987654321",
    "gender": "female",
    "image": <файл изображения>
}
```

#### Ответ:

Конечная точка возвращает JSON-объект с данными нового контакта.

Пример:

```json
{
  "id": 2,
  "name": "Jane",
  "surname": "Doe",
  "about": "Some information about Jane",
  "mail": "jane.doe@example.com",
  "phone": "0987654321",
  "gender": "female",
  "image": "image-16234234345.jpg",
  "creationDate": "2024-07-08T12:00:00.000Z"
}
```

### DELETE `/contacts/:id`

Удаляет контакт по указанному `id`.

#### Пример запроса:

```
DELETE http://std.bit-camp.ru:3000/contacts/1
```

#### Ответ:

Конечная точка возвращает JSON-объект с подтверждением удаления.

Пример:

```json
{
  "message": "Contact deleted",
  "deletedContact": {
    "id": 1,
    "name": "John",
    "surname": "Doe",
    "about": "Some information about John",
    "mail": "john.doe@example.com",
    "phone": "1234567890",
    "gender": "male",
    "image": "image-16234234234.jpg",
    "creationDate": "2024-07-08T12:00:00.000Z"
  }
}
```

## Получение изображений

После загрузки изображений через конечную точку `POST /contacts`, изображения сохраняются на сервере в папке `uploads`. Вы можете получить доступ к этим изображениям, используя URL следующего формата:

```
http://std.bit-camp.ru:3000/uploads/{imageName}
```

### Пример

Предположим, что после добавления нового контакта с изображением на сервере было сохранено изображение с именем `image-16234234345.jpg`. Чтобы получить доступ к этому изображению, вы можете сделать запрос по следующему URL:

```
http://std.bit-camp.ru:3000/uploads/image-16234234345.jpg
```

Этот URL вернет изображение в исходном формате, которое можно использовать для отображения на фронте.

### Как использовать

1. После успешного добавления контакта с изображением через `POST /contacts`, сохраните имя файла изображения, которое возвращается в ответе.
2. Используйте сохраненное имя файла, чтобы формировать URL для получения изображения.

### Важно

- Убедитесь, что сервер запущен, и папка `uploads` существует и доступна для чтения.
- При необходимости изображения можно удалить, используя соответствующие методы и маршруты в вашем приложении.

## Использование

1. Сделайте GET-запрос к конечной точке `/contacts` с нужными параметрами запроса, чтобы получить список контактов.
2. Сделайте POST-запрос к конечной точке `/contacts` с данными нового контакта и файлом изображения, чтобы добавить новый контакт.
3. Сделайте DELETE-запрос к конечной точке `/contacts/:id`, чтобы удалить контакт.

### Пример:

Получение контактов с поиском по имени и фильтрацией по гендеру:

```
GET /contacts?search=ja&gender=male
```

Добавление нового контакта:

```
POST /contacts
```

С полями:

- name: Jane
- surname: Doe
- about: Some information about Jane
- mail: jane.doe@example.com
- phone: 0987654321
- gender: female
- image: (файл изображения)

Удаление контакта:

```
DELETE /contacts/1
```

## Зависимости

- `express`: Веб-сервер.
- `multer`: Мидлварь для обработки загрузки файлов.
- `cors`: Мидлварь для разрешения кросс-доменных запросов.
- `fs`: Модуль для работы с файловой системой.
