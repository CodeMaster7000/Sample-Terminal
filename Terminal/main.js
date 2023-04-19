var CurrentId = undefined;
var hostname = 'localhost';
var username = '';
var folder = '~';
NewLine();
$(document).on('keydown', function(e) {
  var x = event.which || event.keyCode;
  if (x === 13 || x == 13) {
    var consoleLine = $('#' + CurrentId + ' input').val();
    var delay = ExecuteLine(consoleLine);
    setTimeout(NewLine, delay);
  }
});
$(document).on('keydown', function(e) {
  var x = event.which || event.keyCode;
  var line = $('#' + CurrentId + ' input');
  var length = line.val().length;
  if (x != 8) {
    line.attr("size", 1 + length);
  } else {
    line.attr("size", length * .95);
  }
  if (length === 0) {
    $('#' + CurrentId + ' input').attr("size", '1');
  }
});
$(document).on('click', function(e) {
  $('#' + CurrentId + ' input').focus();
});
function NewLine() {
  if (CurrentId !== undefined) {
    $('#' + CurrentId + ' input').prop('disabled', true);
  }
  CurrentId = 'consoleInput-' + GenerateId();
  if (username !== '') {
    $("#Terminal").append('<div class="console-line" id="' + CurrentId + '">' + username + '@' + hostname + ':<span class="terminal-purple">' + folder + ' $</span> <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" class="terminal-input" /><div class="console-carrot"></div></div>');
  } else {
    $("#Terminal").append('The programs included with the Debian GNU/Linux system are free software;<br/>');
    $("#Terminal").append('the exact distribution terms for each program are described in the<br/>');
    $("#Terminal").append('individual files in /usr/share/doc/*/copyright.<br/><br/>');
    $("#Terminal").append('Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent<br/>');
    $("#Terminal").append('permitted by applicable law.<br/><br/>');
    $("#Terminal").append('<div id="' + CurrentId + '">Login: <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" class="terminal-input" /><div class="console-carrot"></div></div>');
  }
  $('#' + CurrentId + ' input').focus();
  $('#' + CurrentId + ' input').attr("size", '1');
}
function ExecuteLine(command) {
  $('.console-carrot').remove();
  var CurrentCommand = command.toLowerCase();
  if (username === '') {
    username = CurrentCommand;
    return 500;
  } else {
    if (CurrentCommand == 'clear') {
      $("#Terminal").empty();
    }
    else if (CurrentCommand == 'exit' || CurrentCommand == 'logout') {
      $("#Terminal").empty();
      username = ''
    }
    else if (CurrentCommand.startsWith("echo")) {
      var NewLine = CurrentCommand.replace("echo ", "");
      $("#Terminal").append(NewLine);
    }
    else if (CurrentCommand.startsWith("hostname")) {
      var name = CurrentCommand.replace("hostname ", "");
      if (name !== '') {
        hostname = name;
      }
    }
    else if (CurrentCommand.startsWith("cd")) {
      var Address = CurrentCommand.replace("cd ", "").replace(" ", "").replace("//", "");
      if (Address == '/' || Address == '' || Address == 'cd') {
        folder = '~';
      } else {
        folder = Address;
      }
    } else if (CurrentCommand == 'help' || CurrentCommand == '?') {
      $("#Terminal").append('GNU bash, version 4.3.30(1)-release (arm-unknown-linux-gnueabihf)<br/>');
      $("#Terminal").append('These shell commands are defined internally.  Type "help" to see this list.<br/><br/>');
      $("#Terminal").append('A star (*) next to a name means that the command is disabled.<br/>');
      $("#Terminal").append('cd [dir] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Change directory<br/>');
      $("#Terminal").append('clear &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Clear console screen<br/>');
      $("#Terminal").append('echo [arg...] &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Echo text back in console<br/>');
      $("#Terminal").append('exit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout of terminal<br/>');
      $("#Terminal").append('help &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Get Help about command<br/>');
      $("#Terminal").append('hostname [arg..]&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Change hostname<br/>');
      $("#Terminal").append('logout &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout of terminal<br/>');
    }
    else if (CurrentCommand === '') {}
    else {
      var NewLine = "<div>-bash: " + CurrentCommand + ": Command not found </div>";
      $("#Terminal").append(NewLine);
    }
  }
}
function GenerateId() {
  return Math.random().toString(16).slice(2)
}
