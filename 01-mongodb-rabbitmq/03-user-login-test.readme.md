loopback % lb
? What's the name of your application? 03-user-login-test
? Enter name of the directory to contain the project: 03-user-login-test
   create 03-user-login-test/
     info change the working directory to 03-user-login-test

? Which version of LoopBack would you like to use? 3.x (Active Long Term Support)
? What kind of application do you have in mind? api-server (A LoopBack API server with local User auth)


### Create City Model ### 

lb model city
? Select the datasource to attach undefined to: db (memory)
? Select model's base class PersistedModel
? Expose city via the REST API? Yes
? Custom plural form (used to build REST URL): cities
? Common model or server only? common
Let's add some city properties now.

Enter an empty property name when done.
? Enter the property name: name
? Property type: string
? Required? Yes
? Default value[leave blank for none]: 

Let's add another city property.
Enter an empty property name when done.
? Enter the property name: country
? Property type: string
? Required? Yes
? Default value[leave blank for none]: 


### Adding ACL ### 

lb acl
? Select the model to apply the ACL entry to: city
? Select the ACL scope: All methods and properties
? Select the access type: Write
? Select the role All users
? Select the permission to apply Explicitly deny access

O/p

  "acls": [
    {
      "accessType": "WRITE",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "DENY"
    }
  ],

O/p 