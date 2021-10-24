export const EXPLiCIT_HASH_CHAR = "$%§";

export function shortHash(s: string) {
  var hash = 0;
  if (s.length == 0) {
    return hash;
  }
  for (var i = 0; i < s.length; i++) {
    var char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return EXPLiCIT_HASH_CHAR + hash;
}
