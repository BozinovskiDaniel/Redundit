import {BeforeInsert, Column, Entity as TOEntity, Index, JoinColumn, ManyToOne} from "typeorm"

import Entity from "./Entity"
import { Post } from "./Post"
import User from "./User"
import { makeId } from "../util/helpers"

@TOEntity('comments')
export default class Comment extends Entity {

    constructor(comment: Partial<Comment>) {
        super()
        Object.assign(this, comment)
    }

    @Index()
    @Column()
    private _identifier: string 
    public get identifier(): string {
        return this._identifier
    }
    public set identifier(value: string) {
        this._identifier = value
    }

    @Column()
    body: string 

    @Column()
    username: string 

    @ManyToOne(() => User)
    @JoinColumn({name: 'username', referencedColumnName: 'username'})
    user: User;

    @ManyToOne(() => Post, post => post.comments, {nullable: false})
    post: Post

    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeId(8)
    }


}