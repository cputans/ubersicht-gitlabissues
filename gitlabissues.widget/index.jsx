/* global fetch */
/**
 * BEGIN HEADER
 *
 * Contains:        GitLabIssues Widget for <http://tracesof.net/uebersicht/>
 * Maintainer:      Chase Putans
 * License:         GNU GPL v3
 *
 * Description:     This file contains the code for the GitlabIssues Widget for the
 *                  macOS software Übersicht.  Based on the GitIssues Widget 
 *                  <https://github.com/nathanlesage/ubersicht-gitissues> 
 *
 * END HEADER
 */

export const params = {
    'gitlab_url': 'gitlab.com', //url of gitlab instance
    'access_token': 'ACCESS_TOKEN', // personal access token
    'project_id': 1, // project id 
    'issue_count': 15,  // number of issues to show 
    'update_frequency': 5 // number of minutes between updates
}

export const command = (dispatch) =>
  fetch('https://' + params.gitlab_url + '/api/v4/projects/' + params.project_id + '/issues?private_token=' + params.access_token + '&state=opened')
    .then((resp) => {
      resp.json().then(data => {
        dispatch({ type: 'FETCH_SUCCEDED', data: data });
      })
    })
    .catch((error) => {
      dispatch({ type: 'FETCH_FAILED', error: error });
    });

export const refreshFrequency = (params.update_frequency * 1000); 

export const render = (data) => {
  return data.error ? (
    <div>Unable to retrieve issues: <strong>{String(error)}</strong></div>
  ) : (
    <div>
      <h1>Gitlab Issues</h1>
      <h4>Updated {data.updated}</h4>
      <table className={table}>
        <thead>
          <tr>
            <td className={tableHeader}>Number</td>
            <td className={tableHeader}>Issue</td>
            <td className={tableHeader}>Author</td>
            <td className={tableHeader}>Created</td>
          </tr>
        </thead>
        <tbody>
          {data.issues.map((issue, i) => {
            if(i%2 == 0) {
              var rowClass = css({
                padding: 5
              })
            }
            else {
              var rowClass = css({
                backgroundColor: 'rgba(160, 160, 160, 0.1)',
                padding: 5
              })
            }
            return (
              <tr key={i}>
                <td className={rowClass}>
                  #{issue.iid}
                </td>
                <td className={rowClass}>
                  {issue.title}
                </td>
                <td className={rowClass}>
                  <img src={issue.author_avatar} height='16' width='16'/>  {issue.author}
                </td> 
                <td className={rowClass}>
                  {issue.created}
                </td>
              </tr>
            )})}
        </tbody>
      </table>
    </div>
  );
}

export const initialState = { output: 'Fetching issues...' };

export const updateState = (event, previousState) => {
  if (event.error) {
    return { ...previousState, warning: `Error: ${event.error}` };
  }

  previousState.issues = [];

  var i = 0;
  for(let issue of event.data) {
    if(i >= params.issue_count) break;
    i += 1;

    previousState.issues.push({
      'iid': issue.iid,
      'title': issue.title,
      'author': issue.author.name,
      'author_avatar': issue.author.avatar_url,
      'created': issue.created_at,
      'url': issue.web_url
    })
  }

  previousState.updated = new Date().toString();
  return previousState;
}


import { css } from "uebersicht"

export const className = {
  top: 10,
  right: 10,
  backgroundColor: 'rgba(200, 200, 200, 0.2)',
  color: '#FFF',
  borderRadius: 5,
  padding: 10,
  fontSize: 11,
  fontFamily: 'Helvetica'
}

export const table = css({
  borderCollapse: 'collapse',
})

export const tableHeader = css({
  borderBottom: '1px solid #FFF',
  fontWeight: 'bold',
  padding: 5
})