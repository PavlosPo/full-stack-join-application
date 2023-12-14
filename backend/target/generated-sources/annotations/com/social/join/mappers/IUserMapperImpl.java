package com.social.join.mappers;

import com.social.join.dtos.PostDTO;
import com.social.join.dtos.SignUpDTO;
import com.social.join.dtos.UserCreateRequest;
import com.social.join.dtos.UserDTO;
import com.social.join.entities.Post;
import com.social.join.entities.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-12-13T22:20:24+0200",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class IUserMapperImpl implements IUserMapper {

    @Override
    public User userDTOToUser(UserDTO userDTO) {
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

    @Override
    public UserDTO userToUserDTO(User user) {
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

    @Override
    public User userCreateRequestToUser(UserCreateRequest userCreateRequest) {
        if ( userCreateRequest == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.firstname( userCreateRequest.getFirstname() );
        user.lastname( userCreateRequest.getLastname() );
        user.username( userCreateRequest.getUsername() );
        user.email( userCreateRequest.getEmail() );
        user.password( userCreateRequest.getPassword() );

        return user.build();
    }

    @Override
    public UserCreateRequest userToUserCreateRequest(User user) {
        if ( user == null ) {
            return null;
        }

        UserCreateRequest.UserCreateRequestBuilder userCreateRequest = UserCreateRequest.builder();

        userCreateRequest.firstname( user.getFirstname() );
        userCreateRequest.lastname( user.getLastname() );
        userCreateRequest.username( user.getUsername() );
        userCreateRequest.password( user.getPassword() );
        userCreateRequest.email( user.getEmail() );

        return userCreateRequest.build();
    }

    @Override
    public UserCreateRequest userDTOToUserCreateRequest(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        UserCreateRequest.UserCreateRequestBuilder userCreateRequest = UserCreateRequest.builder();

        userCreateRequest.firstname( userDTO.getFirstname() );
        userCreateRequest.lastname( userDTO.getLastname() );
        userCreateRequest.username( userDTO.getUsername() );
        userCreateRequest.password( userDTO.getPassword() );
        userCreateRequest.email( userDTO.getEmail() );

        return userCreateRequest.build();
    }

    @Override
    public User signUpToUser(SignUpDTO signUpDTO) {
        if ( signUpDTO == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.firstname( signUpDTO.firstname() );
        user.lastname( signUpDTO.lastname() );
        user.username( signUpDTO.username() );
        user.email( signUpDTO.email() );

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

    protected Post postDTOToPost(PostDTO postDTO) {
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

    protected PostDTO postToPostDTO(Post post) {
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
}
