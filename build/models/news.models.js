"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class News {
    constructor(title, description, url, urlToImage, publishedAt, author, content) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
        this.author = author;
        this.content = content;
    }
}
exports.default = News;
