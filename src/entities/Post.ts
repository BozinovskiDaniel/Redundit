import {Entity as TOEntity, Column, Index,  BeforeInsert, ManyToOne, JoinColumn} from "typeorm";

import Entity from "./Entity"
import User from "./User";
import { makeId, slugify } from "../util/helpers";
import { Sub } from "./Sub";

@TOEntity("posts")
export class Post extends Entity {

    constructor(post: Partial<Post>) {
        super()
        Object.assign(this, post)
    }

    @Index()
    @Column()
    identifier: string // 7 Character id

    @Column()
    title: string // Title

    @Index()
    @Column()
    slug: string // Slug

    @Column({ nullable:true, type: 'text' })
    body: string // Body

    @Column()
    subName: string // Subname

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({name: 'username', referencedColumnName: 'username'})
    user: User;

    @ManyToOne(() => Sub, sub => sub.posts)
    @JoinColumn({name: 'subName', referencedColumnName: 'name'})
    sub: Sub;


    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeId(7)
        this.slug = slugify(this.title) //
    }
}
