/*

http://localhost:8083/ZWaveAPI/Run/controller.DoSomething()

controller.AddNodeToNetwork(M) — start (M=1) / stop (M=0) inclusion process
controller.RemoveNodeFromNetwork(M) — start (M=1) / stop (M=0) exclusion process
controller.SetLearnMode(M) — start (M=1) / stop (M=0) learn mode process
controller.SetDefault() — reset Z-Wave controller to default. NB: will completely destroy
￼all stored data about your network!


It is also possible to execute commands related to devices, its instances or to command class of a particular instance.
For example:
• devices[nodeId].DoSomething(parameter)
• devices[nodeId].instances[instanceId].DoSomething(param)
• devices[nodeId].instances[instanceId].commandClasses[ccId].DoSomething(param)
• devices[nodeId].instances[instanceId].commandClasses.SwitchBinary.DoSomething(para
m)

￼• /ZWaveAPI/Data/0 — Get all data (updates since 1970)
• /ZWaveAPI/Data/134500000

*/