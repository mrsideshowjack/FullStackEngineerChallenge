<template>
  <div class="home">
    <v-col cols="7">
      <h1>Welcome</h1>

      <h2>About</h2>
      <p>
        This is an Engineering challenge that allows employees to submit
        feedback toward each other's performance review.
      </p>
      <h2>Views</h2>

      <h4>Admin</h4>
      <p>Allows an admin to:</p>
      <ul>
        <li>Add/remove/update/view employees</li>
        <li>Add/update/view performance reviews</li>
        <li>
          Assign employees to participate in another employee's performance
          review
        </li>
      </ul>

      <h4>Employee</h4>
      <p>Allows an employee to:</p>
      <ul>
        <li>List of performance reviews requiring feedback</li>
        <li>Submit feedback</li>
      </ul>

      <h4>Select Employee</h4>
      <p>
        Allows you to 'sign in' as an employee for demenstation purposes. Takes
        the place of a auth system.
      </p>

      <h2>Technologies used</h2>

      <h3>Frontend</h3>
      <p>
        <b>VueJS</b> is the main javascript framework with Vue Router for
        routing and axios for basic REST API requests.
      </p>

      <h3>Backend</h3>
      <p>
        <b>None! (It's serverless 😆)</b>, For these simple requirements, where
        all a 'backend' would need to do is validate the data fromthe frontend
        and make an API call to the Database, I didn't feel a full 'backend'
        server was required.
      </p>
      <p>
        Instead selected to use <b>serverless functions</b>. These are
        <b>AWS lambda functions</b> run on Netlify (the same hosting platform as
        the app itself). Making the overall app simpler and cheaper to run.
      </p>
      <p>Additionally this was a good excuse to learn some new tech 👍!</p>

      <h3>Databsae</h3>

      <p>
        <b>MongoDB NoSQL Database</b> hosted for free on mlab. I chose a nosql
        database structure as the data is pretty simple, with only one relation
        (between employees and reviews). Also another good excuse to refresh my
        NoSQL skills 😆.
      </p>
    </v-col>
  </div>
</template>
<script>
export default {
  name: "home"
};
</script>
