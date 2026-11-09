chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  console.log("GOOGLEZERO MATCH:", JSON.stringify({
    url: info.request.url,
    method: info.request.method,
    type: info.request.type,
    tabId: info.request.tabId,
    initiator: info.request.initiator,
    ruleId: info.rule.ruleId,
    rulesetId: info.rule.rulesetId
  }, null, 2));
});