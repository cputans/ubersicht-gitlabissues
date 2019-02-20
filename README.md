# Übersicht GitlabIssues Widget

Display open Gitlab issues 

## Installation

Download the gitlabissues.widget, configure `index.jsx` (see below) and copy it to your Übersicht widgets folder.  

## Widget configuration

The following configuration options are available in the `params` object:
	* gitlab_url:  the base URL of your gitlab instance
	* access_token:  the personal access token of your user.  See [gitlab.com](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) for generating this token
  * project_id:  the ID of the project from which to retrieve issues
  * issue_count: the number of issues to show
  * update_frequency: how often to update the widget, in minutes

## License

This plugin's code is distributed under the GNU GPL v3 license, the terms and conditions of which can be found [here](LICENSE.md).