package com.social.join.mappers;

import com.social.join.dtos.PostCreateRequest;
import com.social.join.dtos.PostDTO;
import com.social.join.dtos.PostUpdateRequest;
import com.social.join.dtos.UserDTO;
import com.social.join.entities.Post;
import com.social.join.entities.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-12-13T22:20:23+0200",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class IPostMapperImpl implements IPostMapper {

    @Override
    public Post postDTOToPost(PostDTO postDTO) {
        if ( postDTO == null ) {
            return null;
        }

        Post.PostBuilder post = Post.builder();

        post.id( postDTO.getId() );
        post.content( postDTO.getContent() );
        post.userCreated( userDTOToUser( postDTO.getUserCreated() ) );
        post.usersWhoLikedThisPost( userDTOListToUserList( postDTO.getUsersWhoLikedThisPost() ) );
        post.createdDate( postDTO.getCreatedDate() );
        post.updateDate( postDTO.getUpdateDate() );

        return post.build();
    }

    @Override
    public PostDTO postToPostDTO(Post post) {
        if ( post == null ) {
            return null;
        }

        PostDTO.PostDTOBuilder postDTO = PostDTO.builder();

        postDTO.id( post.getId() );
        postDTO.content( post.getContent() );
        postDTO.usersWhoLikedThisPost( userListToUserDTOList( post.getUsersWhoLikedThisPost() ) );
        postDTO.userCreated( userToUserDTO( post.getUserCreated() ) );
        postDTO.createdDate( post.getCreatedDate() );
        postDTO.updateDate( post.getUpdateDate() );

        return postDTO.build();
    }

    @Override
    public PostCreateRequest postDTOToPostCreateRequest(PostDTO postDTO) {
        if ( postDTO == null ) {
            return null;
        }

        PostCreateRequest.PostCreateRequestBuilder postCreateRequest = PostCreateRequest.builder();

        postCreateRequest.content( postDTO.getContent() );
        postCreateRequest.userCreated( postDTO.getUserCreated() );
        postCreateRequest.createdDate( postDTO.getCreatedDate() );

        return postCreateRequest.build();
    }

    @Override
    public PostUpdateRequest postDTOToPostUpdateRequest(PostDTO postDTO) {
        if ( postDTO == null ) {
            return null;
        }

        PostUpdateRequest.PostUpdateRequestBuilder postUpdateRequest = PostUpdateRequest.builder();

        postUpdateRequest.id( postDTO.getId() );
        postUpdateRequest.content( postDTO.getContent() );
        List<UserDTO> list = postDTO.getUsersWhoLikedThisPost();
        if ( list != null ) {
            postUpdateRequest.usersWhoLikedThisPost( new ArrayList<UserDTO>( list ) );
        }

        return postUpdateRequest.build();
    }

    @Override
    public PostDTO postCreateRequestToPostDTO(PostCreateRequest postCreateRequest) {
        if ( postCreateRequest == null ) {
            return null;
        }

        PostDTO.PostDTOBuilder postDTO = PostDTO.builder();

        postDTO.content( postCreateRequest.getContent() );
        postDTO.userCreated( postCreateRequest.getUserCreated() );
        postDTO.createdDate( postCreateRequest.getCreatedDate() );

        return postDTO.build();
    }

    @Override
    public PostDTO postUpdateRequestToPostDTO(PostUpdateRequest postUpdateRequest) {
        if ( postUpdateRequest == null ) {
            return null;
        }

        PostDTO.PostDTOBuilder postDTO = PostDTO.builder();

        postDTO.id( postUpdateRequest.getId() );
        postDTO.content( postUpdateRequest.getContent() );
        List<UserDTO> list = postUpdateRequest.getUsersWhoLikedThisPost();
        if ( list != null ) {
            postDTO.usersWhoLikedThisPost( new ArrayList<UserDTO>( list ) );
        }

        return postDTO.build();
    }

    @Override
    public Post postCreateRequestToPost(PostCreateRequest postCreateRequest) {
        if ( postCreateRequest == null ) {
            return null;
        }

        Post.PostBuilder post = Post.builder();

        post.content( postCreateRequest.getContent() );
        post.userCreated( userDTOToUser( postCreateRequest.getUserCreated() ) );
        post.createdDate( postCreateRequest.getCreatedDate() );

        return post.build();
    }

    @Override
    public Post postUpdateRequestToPost(PostUpdateRequest postUpdateRequest) {
        if ( postUpdateRequest == null ) {
            return null;
        }

        Post.PostBuilder post = Post.builder();

        post.id( postUpdateRequest.getId() );
        post.content( postUpdateRequest.getContent() );
        post.usersWhoLikedThisPost( userDTOListToUserList( postUpdateRequest.getUsersWhoLikedThisPost() ) );

        return post.build();
    }

    protected List<Post> postDTOListToPostList(List<PostDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<Post> list1 = new ArrayList<Post>( list.size() );
        for ( PostDTO postDTO : list ) {
            list1.add( postDTOToPost( postDTO ) );
        }

        return list1;
    }

    protected User userDTOToUser(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.id( userDTO.getId() );
        user.firstname( userDTO.getFirstname() );
        user.lastname( userDTO.getLastname() );
        user.username( userDTO.getUsername() );
        user.email( userDTO.getEmail() );
        user.password( userDTO.getPassword() );
        user.token( userDTO.getToken() );
        user.likedPosts( postDTOListToPostList( userDTO.getLikedPosts() ) );

        return user.build();
    }

    protected List<User> userDTOListToUserList(List<UserDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<User> list1 = new ArrayList<User>( list.size() );
        for ( UserDTO userDTO : list ) {
            list1.add( userDTOToUser( userDTO ) );
        }

        return list1;
    }

    protected List<PostDTO> postListToPostDTOList(List<Post> list) {
        if ( list == null ) {
            return null;
        }

        List<PostDTO> list1 = new ArrayList<PostDTO>( list.size() );
        for ( Post post : list ) {
            list1.add( postToPostDTO( post ) );
        }

        return list1;
    }

    protected UserDTO userToUserDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO.UserDTOBuilder userDTO = UserDTO.builder();

        userDTO.id( user.getId() );
        userDTO.firstname( user.getFirstname() );
        userDTO.lastname( user.getLastname() );
        userDTO.username( user.getUsername() );
        userDTO.email( user.getEmail() );
        userDTO.password( user.getPassword() );
        userDTO.likedPosts( postListToPostDTOList( user.getLikedPosts() ) );
        userDTO.token( user.getToken() );

        return userDTO.build();
    }

    protected List<UserDTO> userListToUserDTOList(List<User> list) {
        if ( list == null ) {
            return null;
        }

        List<UserDTO> list1 = new ArrayList<UserDTO>( list.size() );
        for ( User user : list ) {
            list1.add( userToUserDTO( user ) );
        }

        return list1;
    }
}
