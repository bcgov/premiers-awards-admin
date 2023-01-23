<template>
  <div class="p-fluid">
    <h1>Premier's Awards: User Guide</h1>
    <Divider />
    <h2>Overview</h2>
    <p>
      The Premier&rsquo;s Awards nomination web application is used by designated nominators to submit
      and manage award nominations. The following documentation is intended for all users. Permitted user roles are
      in parentheses.
    </p>
    <Divider />
    <h2 class="mb-5 mt-5">User Management</h2>
    <h3>Nominator Registration <Tag value="Non-registered Users" /></h3>
    <ol>
      <li>Navigate to the main <a href="#" @click="()=>{redirect('/')}">Dashboard</a> (homepage)</li>
      <li>Complete the User Registration form to be added as a Nominator. Note the following:
        <ul>
          <li>GUID and IDIR fields will be filled in for you (based on your IDIR authentication)</li>
          <li>User will be automatically added with the default "Inactive" role. Inactive users
            have a record in the database but do not have permissions to submit nominations.</li>
          <li>Once registered, the user record is now viewable by administrators</li>
          <li>
            To be granted Nominator permissions, an administrator has to update your user role to
            "Nominator" (see instructions below).
          </li>
        </ul>
      </li>
      <li>Once the role change has been completed, notify the nominator that the registration has been approved
        and return to the <a href="#" @click="()=>{redirect('/')}">Dashboard</a>.</li>
    </ol>
    <Divider />
    <h3>Activating Nominators <Tag value="Administrators" /></h3>
    <ol>
      <li>Navigate to <a href="#" @click="()=>{redirect('/users')}">Manage Users</a></li>
      <li>Locate inactive users (role or status is &quot;Inactive&quot;)</li>
      <li>Click the &ldquo;Edit User&rdquo; icon to open the edit user dialog box.</li>
      <li>Update the user role to include &ldquo;Nominator&rdquo; and deselect &ldquo;Inactive&rdquo;.
        <ul>
          <li>The nominator user now has the permissions to submit nomination forms.</li>
          <li>Note that administrators also have the option to edit other user data or delete users</li>
        </ul>
      </li>
    </ol>
    <Divider />
    <h2 class="mb-5 mt-b">Nominations</h2>
    <h3>Creating Nominations <Tag value="Nominators" /> <Tag value="Administrators" /></h3>
    <p>From the <a href="#" @click="()=>{redirect('/')}">Nominator Dashboard</a>),
      users can click &ldquo;Create Nomination&rdquo; for any of the
      following award categories to start a new nomination:</p>
    <ol>
      <li>Emerging Leader</li>
      <li>Evidence-Based Design</li>
      <li>Leadership</li>
      <li>Legacy</li>
      <li>Innovation</li>
      <li>Organizational Excellence</li>
      <li>Partnership</li>
      <li>Regional Impact</li>
    </ol>
    <Divider />
    <h3>Editing/Submitting Nominations <Tag value="Nominators" /> <Tag value="Administrators" /></h3>
    <p>When completing the nomination, note the following:</p>
      <ol>
        <li>The status of the form validation is shown in the lefthand menu. A completed and valid
          form will have each section marked with a check.</li>
        <li>You can save draft nominations by clicking the green &ldquo;Save Draft&rdquo; button.
          Click the &ldquo;Edit Nomination&rdquo; icon to edit a draft nomination.</li>
        <li>Once the form is complete and valid (including uploading attached files), a green &ldquo;Click
          to Submit&rdquo; button will appear in the top right of the nomination form.</li>
        <li>When a nomination is submitted, a PDF document is made of the nomination data, as
            well as a merged PDF that appends the attachments.</li>
        <li> You can confirm that the saved form has been submitted (green &ldquo;Submitted&rdquo; status)
        on the &ldquo;Nominations&rdquo; management page.
      </li>
      <li>Administrators can confirm the saved or submitted nomination by viewing or downloading the generated PDF package.</li>
      <li>Administrators also have the option to edit or delete draft and submitted nominations.</li>
    </ol>
    <Divider />
    <h3>Re-submitting Nominations <Tag value="Administrators" /></h3>
    <p>
      Submitted nominations cannot be edited by the nominator unless an administrator &ldquo;unsubmits&rdquo;
      the form. Here&rsquo;s how that works:</p>
    <ol>
      <li>Navigate to &ldquo;Nominations&rdquo;</li>
      <li>Find the submitted form and click the lock icon to unsubmit (click &ldquo;Yes&rdquo; to confirm).</li>
      <li>Confirm that the Nominator can now make edits to the nomination.</li>
      <li>Nominator resubmits the nomination.</li>
    </ol>
    <Divider />
    <h3>Exporting/Download Nomination Packages <Tag value="Nominators" /> <Tag value="Administrators" /></h3>
    <ol>
      <li>Navigate to &quot;Nominations&quot; management</li>
      <li>Select one or more submitted nominations (draft nominations are ignored on bulk downloads)</li>
      <li>Click &ldquo;Download&rdquo; at the top right.</li>
      <li>Save the downloaded zipped file to a local directory</li>
      <li>Unzip the downloaded folder and review the contents. You should find a nomination PDF for each of the selected nominations.</li>
      <li>Confirm the submission data matches the nomination data in the application</li>
      <li>Save the downloaded zipped file to the appropriate Teams Drive</li>
      <li>Confirm users have access to the file</li>
    </ol>
  </div>
</template>
<script setup>
  import {useRouter} from 'vue-router';
  const router = useRouter();
  const redirect = (path) => {
    // literal string path
    router.push(path)
  }
</script>
