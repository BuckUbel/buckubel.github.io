import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../../helper/types";

interface Door2Props extends StyledCompProps {
}

function Door2(props: Door2Props) {

  const stepOne = window.performance.now();
  const startInput = ["15-19 k: kkkkkkkkkkkkzkkkkkkk", "1-11 s: sbssswsqsssssrlss", "8-9 b: pbbbbbbkbz", "4-10 w: wwccwcqwdmbktjrxhw", "1-6 x: jvscgqsnt", "1-7 x: xxxxxxcx", "6-10 s: smssssfskssdwvtcss", "6-12 q: qqqqzqqjqfqdqq", "3-7 d: ddwbzbf", "12-14 s: ssdssssssssmsq", "4-11 w: wwwwprvgklvwtxwpwwww", "6-7 j: jjjjjjz", "1-6 l: xxlnll", "14-15 n: nnnnxnkmnnnnnvfnnnj", "5-6 h: hbhhhhz", "4-6 b: brbhbrb", "2-7 q: zmqszpqwcq", "9-15 z: zzzzzzzpczzzzzzz", "6-10 m: mmmmmmmmmmmm", "8-14 l: llllllbljlllzllz", "4-10 c: cbccjxhlcclpf", "1-4 d: mpvglsjhsddtsnjsdqw", "2-8 f: ffffffftfb", "4-14 q: qqcpqqqqqtzhqqqqknq", "3-5 m: nctdm", "1-4 l: lllg", "11-12 s: sssssspsssfvxks", "5-9 l: fvsllcvgsmlzw", "3-5 d: dddtpd", "3-11 x: xxjkxxcxqvlprxgx", "8-9 b: bbbbbbsbs", "6-8 f: zffffnffjs", "7-8 v: vvvxvvvvvv", "6-9 b: nbvrbptfbbnbxb", "8-9 c: cccccccrc", "14-15 v: vvlvvvvvvvvvvlvv", "1-5 f: lvndmpdf", "3-4 l: sllfl", "5-14 w: jknqvcwwzwgfwwww", "2-6 b: vbbcbc", "3-4 x: xxbwf", "12-16 h: hhhkhhhthxqnhzhhhn", "1-4 j: vjjjj", "14-17 m: mmmmmmmxmmbpmcmmmmz", "1-9 z: rzzzzzzzzzzzzzzh", "7-8 r: vrmrrnrrrrnr", "8-11 z: fzzzzzzzzzz", "3-5 l: kdjlljpllz", "11-15 h: xhhhhhbjhshhkhbhhhht", "4-11 h: qhbnhhhhhdtwhqsh", "8-10 r: xrrrrrrrrrr", "5-9 q: qqqqpgqqq", "6-14 g: kgvfhqvhggglrgddgg", "6-8 h: ssctfnhhvhxhhxphhlc", "4-18 h: hhhqhhhhqhkhhhhhcl", "2-6 t: pvttttttmtx", "1-12 b: gfhbwwbbsvbcfb", "8-10 m: fmmmmmmzmmrmkq", "16-20 h: hhlhhhhhhhhbhhsfhhhh", "4-8 q: xqtjqqqq", "5-12 g: xzrbngggggnngb", "4-5 j: jjjsj", "6-12 b: bxmbbbbbbbbrpbb", "13-14 n: nnnnnnnnnnnnng", "14-16 s: wfnqltmpsksrtvdc", "6-13 g: ggmggjggggggggg", "5-9 v: wvvvrvvdmv", "1-5 h: hhhhdvhh", "6-8 g: bggggcgg", "5-9 w: wjfwhhwwtwwt", "10-13 n: nnnnnnnnnnnnqnn", "1-3 f: qfff", "15-19 t: ttttttttttttmtstrttt", "1-2 d: bddd", "5-6 v: vvvvvn", "3-4 r: vhrprrgncrcrbkml", "12-14 c: ccccccfcccclccncg", "11-12 m: mpmmbmpxdtdp", "16-17 f: qsfffffjwfttfxffr", "7-13 f: fdjcfffffvffv", "7-9 z: zsnzzzpxz", "8-14 r: grrrrxrrrnjrrs", "6-8 f: svndffdh", "13-17 b: bbbbbbbbbbbbbbbbp", "3-14 f: fkxsfkvvxbfbhfff", "4-15 d: bdndvlwwnzsqdhd", "12-14 f: hfmffkmjlfffqf", "5-8 v: qmlctvvvvjtvj", "5-8 w: wwpxvrgwbfwwtbwlx", "11-13 f: fffqffffffffn", "2-5 s: wvmhsmswn", "12-14 h: hhhhhhhhhhhhhxh", "8-14 l: lllllllclcllllllql", "13-15 l: lllllvgsllsllllllfnl", "2-8 c: cjlccvcc", "1-5 l: plqllpsllnl", "1-5 k: kvfqkkk", "9-13 s: dpvfnsnmksfss", "3-4 b: mfgb", "1-8 j: wjjwjjjxzxn", "9-11 v: vvvvwvvvvvs", "7-8 v: vvrvvhhrhvpvvbv", "9-12 d: dscvhvlndzgf", "10-17 l: llqllpllllllllllgllx", "3-4 k: nkkgkv", "14-19 q: qrqqqqqqqqqqwzqfqqq", "9-11 c: nqccccccccncccccc", "5-19 n: pfndnknwrnnbnjqndnnt", "2-6 s: nsftszgk", "3-9 j: jjfjjjjjfj", "1-7 m: xmmtzmmmm", "5-13 j: jljrjhjlgjtrnq", "2-13 f: fmfzggfmffsth", "12-13 m: mmmmmmmmmmmtvm", "11-12 k: kkkkkkkkkkjk", "8-10 s: sssssssksks", "3-4 w: wfwwbwswd", "2-9 l: sllqllldll", "4-6 f: zfcfrf", "9-12 m: sfmmwjmmnmmcmtmm", "1-2 f: lffwd", "3-7 f: vzltffffqfff", "1-4 g: grgr", "14-15 r: rrrrvjrrrgrrrrtrrr", "13-14 f: bfswfmfffvffpdffkrhb", "1-11 s: ssssssssssss", "13-14 v: vvvvvvvvvvvvvf", "1-2 g: ggggg", "6-13 m: vrzwmncmmhmmc", "7-15 h: vhhhwghkwhclrhh", "3-5 w: ccwwwxwcnf", "4-5 j: jmcvjz", "3-4 b: bbbw", "14-15 b: bbbbbbbbbbbbbbd", "14-16 w: dzwwwwwwwwwwwwwxkw", "2-4 n: jnxfznsn", "6-7 c: cccccgv", "2-4 w: xwbbqwlswh", "7-10 f: sbbxcnffpgfmfffgtm", "2-3 z: gccczkzt", "4-5 k: wtskbwk", "9-10 k: kkkkkkkkktk", "9-12 l: llllllllwjllllll", "1-5 c: ccccpr", "1-5 s: ssssh", "4-7 r: dtnrmcfsc", "8-10 p: pppztpllppp", "3-11 l: lljllljllfl", "4-13 l: lllvlbllphlldn", "5-6 h: fhhpmhm", "4-6 x: xxxhtx", "5-8 j: mrthqkpj", "6-11 k: kkkmqvfnjkwkxpxkskc", "10-11 j: jjjjjjcjjljjjjjj", "2-6 x: ctmtskbcxbn", "12-15 p: pppppdppnpppppwk", "2-12 q: qqhzqvjnmcmrfkphbrx", "2-3 l: llhxljlcxdvrwppdm", "7-15 j: xbjjhssjjjjpjjjjj", "1-4 k: kkkn", "2-7 v: mpvwbmvvhxjpv", "4-6 k: kkcgwkrlqbbpgqmlk", "1-2 v: khpskvgxvdpw", "7-9 p: ppppppgpt", "11-12 h: hhhhvhhhkhhsh", "4-5 n: dnngnlpn", "3-5 k: kmwkkk", "7-12 s: ssssdsbjbssstssss", "6-12 c: cdcccmcccccc", "3-4 g: gglsggggggggggggggg", "5-14 p: ptrnpppbwwjmckbwpmw", "1-4 t: tbfdtrtbtdjnk", "3-7 k: jwkkzlftt", "1-4 z: jzzzl", "1-5 t: jtttpdhttttgtnt", "7-13 n: nnnnnnvnnnnnk", "5-11 f: ffdfftffffkfdf", "8-14 q: qvcqfqqtkqqjqgqjqn", "10-13 b: qbbbbbbbjqbbbb", "8-9 l: blsljwlwl", "11-14 g: ggxgfrbgggqgvgznzg", "10-17 t: rttttctxrttttttttt", "4-5 j: jjjjs", "4-5 q: qkqzglqgnfqpp", "10-11 b: ddbbbbbbbbbbbh", "7-11 s: wsssssssssgs", "3-14 l: lvxlfjkqllfmzs", "10-11 z: zmznzzkzzhvlzcz", "1-4 n: nnnj", "7-11 f: dnffqxxgznknfcffff", "5-17 k: fkjkdkktkpwwkxkkk", "2-6 q: qtqqqq", "5-10 n: nhxwndndnn", "14-18 x: xxxxxxxxxxxxxrxxxlx", "9-16 n: hnnfnvnncdnrxnnf", "6-7 l: lllxllvlh", "5-6 d: hdddxl", "11-15 g: ggggggqgggcgfgcg", "15-16 l: lllllllllllllllpl", "2-7 q: nmtqsfqqlkxq", "4-5 b: bbcbsnb", "9-11 f: ffffffffffn", "2-15 p: qrnpxnpcpppqrppp", "4-5 s: sqszspvggsds", "5-7 m: mmzsmmcm", "9-17 q: qqqqqqqqgqqqqqqqc", "5-14 w: swwgghwwwsvcjqqjw", "7-9 b: ptnhdbzfbbjsjkm", "4-9 h: bhhtcqnhh", "9-10 t: zcttwtttggttn", "3-4 j: cjzjj", "14-18 h: hbzhgcjhhhhzkhhpwb", "1-5 b: bbbbw", "9-10 k: kkkkkkkkkkk", "5-7 m: mmmmcmsm", "2-6 x: jxxdxlxx", "6-10 v: kxvvdvvrxdvk", "2-12 z: zllzlnzfztlszzzct", "3-4 d: dddd", "2-10 h: hhhhhhhfhddhhbg", "1-6 x: xdgfgxn", "4-5 h: shkhrhhdfhh", "1-8 f: zffbfffffff", "4-10 p: cskpcpjmtpcftsblszpv", "4-17 p: pppbppppppppppppppp", "8-9 j: jjjjjjjvj", "4-5 p: pdppppp", "6-12 k: kkkkkzkkkkkkk", "5-15 n: nqnnklnnnnnnnnnnnnn", "3-7 g: qhggbgdm", "2-3 r: cjprr", "9-10 q: vkgcjcnrzqgq", "5-6 m: mmmmmmm", "4-15 f: fffcffffffffffk", "5-13 f: hfffntlfffpfffffff", "8-9 p: dpjppppppp", "5-6 j: njsrjj", "2-3 k: kkkzzb", "7-8 g: cggbpgkgjgmggvvgn", "12-13 w: wwskwwwwwwwwjww", "6-8 w: lwwjwwwcw", "4-5 l: lllll", "6-7 g: sggkggkplxgxprsnggg", "5-6 h: hjrhzszvhhq", "9-17 w: wwwwwwwwwwwwwwwwdw", "16-19 c: ccccrccccccdcctcccn", "3-7 t: ftngtnntttttttzftttt", "11-13 q: qqqwqqqqqvqqg", "4-12 s: ssssdjssssszxs", "1-14 c: chsckjmxwghqvvckvf", "9-18 s: sssssssslssssssbsss", "7-8 n: nnnnnnnnn", "7-9 c: ccccccwcc", "14-20 n: nnwnnznnnnnrnnrnnnnm", "13-14 h: hzhhhhbhhhhhhshhh", "5-7 x: xxkzxmqxszf", "7-13 l: lllllxllftllhzl", "1-3 f: fftff", "11-12 t: tpktttttcvtt", "6-8 r: frjzrpbrrrqqr", "7-12 w: nwwlpvwwdwbzbldnd", "13-14 r: rrrrrrkxrnrrnrrrr", "13-17 b: bfbbbzlbbbbbbbbbb", "4-7 g: ggggghrpgrg", "1-3 v: jvvv", "8-9 l: llllllllll", "13-15 r: rrrrrjrrrrrrrrg", "4-8 b: bbbbkbprh", "6-14 k: klkzkkkkqkkkkkkkm", "9-10 l: lllllgllsl", "4-6 q: qqqtqqqq", "6-8 l: zkfbhwpq", "10-15 v: rvvjvvvvvvvvvdvvsvd", "2-12 b: bwbbvsrbrbzbb", "9-10 m: mmmmmmmmmmb", "4-8 r: xrzrzmrrzrrzr", "1-10 c: cccccccxbbhcccrzc", "5-6 q: bqqvkqqs", "3-13 t: ttttbtttttttlt", "2-4 z: zfzz", "1-8 v: qvvvvvvv", "3-7 g: ggwgggg", "5-6 d: ddddddd", "10-13 c: ccqccccccscfccjcc", "2-7 h: qghlfphcr", "9-11 w: rwwwwpwwqwx", "2-10 h: shftplxhvplqr", "1-3 n: qsnndvnzczn", "17-18 b: bbbbblbbbbbbbbbbbm", "4-14 k: hjkkqgkdvfjflkkv", "10-13 k: wbtkgkjrdlsxkw", "2-4 h: xhqqmhhvkmbpqqsnrn", "9-20 z: zzzzzrzzzzqzzzzszszd", "4-5 x: mxxxrx", "13-15 w: wwwwtwwnzwqwvwwwwwwj", "10-16 n: tcnlnsqnndnwrnjnnn", "3-5 c: cbccrc", "8-11 z: zzzzzzzzzzhzzz", "5-7 f: ffffffff", "7-8 q: qqqqqqfq", "6-7 v: vvvzvlvv", "1-2 t: zttt", "12-17 b: bbvbbbtjbbbbbwbbd", "10-11 h: hhhhhhhhkkh", "17-18 g: gggggggggggvgggggg", "4-7 t: tttmhttttgd", "10-12 w: wfwwwdwwwwwwldc", "4-6 d: dsdddj", "9-10 v: lkvvvvvflv", "6-8 j: jvjjbjjpvjjjj", "8-12 h: hhhthwhhhhhh", "16-19 x: xxxxxxxxxxxxxxxbxkq", "1-13 c: ccgnccvzczzcphcp", "4-11 n: pnnnnbkmnbqqn", "13-16 x: xwxxxxxxxxxxxxxx", "5-6 m: qffrmmclzbtfqmxb", "4-9 k: kfwzkvjzqk", "11-14 j: jjdjjjgjtzjjjjjjxjjm", "1-4 b: bbbpdqbdbbgdhcbv", "8-9 w: hvnwwwkwmbwpwtbpw", "3-4 h: phhmh", "11-12 j: jjjjjjjjjjjj", "5-15 v: vvvvlvvvvvvlsvv", "5-9 q: gqqqzqhjpqqvqj", "12-13 x: xxxxxxxxxxxxl", "7-9 x: gtxxxxxxxw", "13-14 n: nnnnnnnnngnnmnn", "2-6 s: ssssssss", "1-2 b: bhbbb", "6-7 t: tttttttt", "1-9 k: kvkcjwzhl", "8-11 b: bbbbbwbbrbk", "15-18 p: pppppppppppppppppp", "1-6 f: wfnftfvff", "2-4 d: tdddddpdw", "3-16 s: ssbsssssssssssspz", "15-17 p: gpxpppppppppppppg", "4-5 w: wwwww", "9-12 t: htttttttzlgtrtt", "3-5 c: fcncc", "1-3 g: gggn", "6-12 c: kcccccxncwcqc", "4-6 v: vmpvqv", "1-8 x: sxxxxxxdlx", "16-17 d: dddddddddhddgjdxdddd", "5-9 s: sbkrswskxsskskqlcp", "5-8 h: hfhhhhhfgd", "2-5 t: tdttt", "10-11 k: kkkfkkkkkkp", "10-11 h: hhhqhmhhhjl", "9-15 r: rmrrrrkncrxrrrp", "5-7 k: kkcqxkkkj", "14-16 g: gvgxgkgpgrxsgwxw", "9-13 g: qbwsggggzggggp", "2-7 t: jdvbklttd", "1-3 r: trrfxqff", "7-8 t: ttxtttvt", "16-17 b: bbbbbbbbbbbbbbbbb", "5-14 r: rgrrlrrrrrrrrrgr", "10-11 x: qbfdztwxpxdxj", "2-3 q: brqq", "5-15 t: ttttftvlttttttgttt", "3-6 v: hvhthfw", "4-6 n: nngdnkxzc", "2-7 l: bkwmlrl", "2-8 q: xtqqqqhdwq", "13-15 f: fffffffbfvffffflf", "6-9 c: dqvwbscpccccrcccchws", "4-5 l: gvjltw", "3-6 q: qgnpjqgbl", "1-3 t: tsgt", "6-8 p: ppjppphfpj", "1-4 d: xddd", "12-13 m: mmmmmmmmmmmmvm", "7-15 b: bvnbcrbvtpbqbbbbl", "13-15 x: kxxxhxxvxxxtngxxxxxx", "4-5 p: pppvvtncp", "11-14 p: pppvpppppspdpppx", "2-3 p: wppp", "8-9 f: fdmcfffxnnff", "9-11 q: qqqqqqqqrqn", "13-15 b: bbbbbbbbbbbbbbv", "6-12 r: rmvrrlrrjrrrrrsrrr", "1-2 l: qllllpkllhlllbw", "9-12 w: pbvwkbfwdngw", "3-13 k: kfhdkkkknkkkkkkhl", "8-18 b: vbbnbqzpjwbbdbbcglsr", "5-17 q: qqqqqqqqqqqqqqqqqqh", "4-8 c: cccwbcncdcc", "8-9 n: kfsbvbnntcn", "2-5 f: vfvffrq", "17-18 j: jjjjjjjjjjjdjjjjtp", "5-7 g: ggjhgcbg", "14-15 q: qqqqqqqqqqqqqqp", "2-3 d: dzjd", "6-18 t: ntntttqtmttttktttqtt", "2-6 r: rmwrwppprc", "9-14 z: zlzzzzklsgzvfz", "7-8 k: vkfglktkkkkk", "3-8 d: mdkdxxbdqddrjwvc", "13-17 c: ccfccccccccczccvcc", "4-5 k: kkknrr", "12-15 s: vbssssssssnfsssss", "7-18 m: mmpmmtwvkmmcnscmdmj", "13-16 v: dvvvrvdvvvvvjvvvpjvc", "3-4 t: tjtkndtbwh", "4-6 k: kkbkpz", "8-13 k: kckzkktnfzmdkjkkb", "8-13 j: jsnntcjcjjqzjj", "11-13 b: bgwbbbpbbbqbbb", "3-6 r: zqrrrjsj", "2-7 k: zkklkttkxk", "3-5 p: gjphpsppntgp", "17-18 l: llllllllllllllljlll", "6-11 r: srxfbrswrnlfp", "1-8 q: nsbqchsqqx", "5-7 r: rvrrkjcrjmr", "5-12 r: rrrrrsrrrrrvrrrr", "3-7 k: kkdkkkkxk", "11-16 p: rppppppppcppdpmbp", "16-17 p: pppppppspppppppjpp", "4-15 t: zsrtxgfdtrgxhmcst", "5-10 k: gkkzkfkkkknk", "13-17 w: wgwcwwwwwfcwmwwhpww", "7-8 l: llllllvw", "2-7 g: ckdqngmzhghcvlcn", "14-15 q: qqqqqqqqqqqqcbqq", "3-6 m: mfmcmd", "3-6 b: bbbbbm", "1-8 n: nmwnnsnmznnnmrn", "7-11 n: lnnnmrnqnntxnqcn", "3-12 h: tghhthwtjjhhfbhdpnh", "2-4 d: jsddd", "8-9 w: wwzwwwbwzwc", "10-12 r: rrrrrrrrrrrrr", "1-2 b: xbbqkfp", "3-6 p: dfppptptv", "8-12 z: jzzzdbzhwzzmklzkvmz", "1-4 n: nqnprp", "2-11 b: jbshxxbxczhscksvhctm", "5-6 b: bmhbcvgjfbc", "3-7 m: qlfmmdm", "8-9 v: vvsvsvvfv", "7-10 l: llllldllln", "9-10 c: ccccfgcctcc", "7-17 j: vvjgnjvtjjjvvjjjtj", "5-6 s: ssssvs", "3-11 q: qqqbqqtqqqzqqgj", "4-5 k: rkjskkqk", "4-16 k: kkkkkkkkkkkkkkkkk", "2-4 h: shch", "5-7 n: kznnmgnnnn", "3-8 r: xhrrrrrg", "4-6 m: bmmmmgqmnn", "3-14 t: tttktwfmthkttdq", "4-5 w: wwwvww", "1-2 k: kkrkmkkw", "6-11 h: hhhhhhhhhhsh", "1-9 h: fhhhhhhhbhhhhhhhh", "7-9 b: frkqtcwstzqbdd", "2-3 p: xxpvrmcmppbw", "12-14 r: rrrrrrrprrrrrq", "5-7 l: llcqllc", "10-13 x: bpwxpmrrmxbjrv", "8-16 w: wfcnvwvwlvtnwwfg", "1-5 k: kglsfqshkpbs", "1-8 w: mwwwwwwww", "4-7 d: ddgldhddvd", "5-7 v: qvjvxvvvvvvv", "1-2 s: ssns", "6-9 m: prmmrmbmqmftmmb", "13-14 p: ppppphpppppppq", "8-10 k: kkzkkklkkkck", "1-3 p: pnpswpmsfk", "15-19 r: trqmkzfvlrkrrgsjhrr", "15-17 c: ccccccrxcccscccczcxc", "2-6 b: rbbbbdpprw", "7-14 l: lllzlsklllllll", "12-14 l: lnllhlllplltllrplll", "3-5 w: wlwwbr", "5-9 h: hhcvppjrhhhhhqc", "2-3 w: wwwzt", "2-5 l: lnrlll", "1-4 v: vvvl", "5-6 g: mkngggzgxkggkldg", "6-7 m: mmmmmlm", "8-10 k: cnkkzkklwkvkkk", "7-13 g: ngqggglgggggggg", "8-10 m: mmmkmmmpmm", "8-12 f: ffffpffffffz", "12-15 f: ffffffxffffcffff", "9-14 w: wtrcwthdwxnwwfpwbj", "4-7 l: xfllfnlxlgbll", "6-8 c: tcdppkscmc", "4-10 s: qssssspsskss", "2-4 t: wgpdqdcdtd", "3-4 s: shsbksdj", "3-4 n: nnmn", "2-6 x: dxxxxjxr", "1-3 b: qbbptm", "9-11 h: hhhvhhhhvhhxhhhrr", "3-5 x: xxxxw", "2-4 l: kgrll", "3-5 m: mmhmmmm", "7-9 j: fjkjbjjjfjhcj", "3-4 n: ngfnbzln", "9-10 x: xxxxxxxxxz", "11-12 c: ccccccccccjcg", "9-14 j: swnjssjjjjjmjnj", "2-3 n: nrcfrf", "11-12 g: gggggggggdzxg", "4-5 v: vvbvnq", "8-9 s: ssssssssx", "6-7 l: zlznxjlb", "14-16 x: xxxxxxxxxxxxxdxx", "6-8 x: xlxjxxlxxmxx", "2-7 r: prgnrrrqrpcr", "15-16 m: mmmmdmmmmmmbmmhmmm", "14-15 w: wwwwhwwwwwwwwwwwww", "5-9 k: kkkkkkkkkk", "8-9 c: rccccqcchc", "6-12 v: pvvvvvzlmvltkh", "10-11 h: hbhslhhhhlhhhh", "1-7 s: ssjswbj", "5-12 q: qslqzqjqxxqpqzvjnq", "4-11 z: znmzbhdgftf", "5-7 g: sgtwggggghgglfgt", "2-4 d: kdddfdqk", "11-13 m: mjmmmmmmmmmmt", "12-14 k: nskkkkxkkskwkk", "6-11 j: vhpjqjhrjjjg", "7-14 l: lllllllllllllm", "2-15 g: bcqpgsvgkfgsmrgvpgng", "2-9 w: grwwwwcbwwwwdxprt", "3-18 w: wwkwwxvwwwhnwwbhzw", "5-13 g: ggggggggggggdgggggg", "10-12 h: hhhrhhhhcldh", "2-5 k: xhpnk", "11-14 f: ffffffffffffff", "4-8 x: wxxjxxmx", "16-17 d: dddddddddddmdddvd", "3-14 l: lllllllllllllpl", "1-2 w: rfzvvcww", "5-7 v: nwvxvxkvvxctvh", "1-3 k: kxghkkb", "17-18 j: jjjjjjjjjjjjjjjjht", "2-5 t: tchptl", "9-15 j: jjpjjjjjjjjjjjjq", "1-7 r: rrrrrrxrrrj", "13-15 h: hhhhhhhhhhhhhhqhhhhh", "2-4 v: xdwvk", "3-6 w: rwmwkwgcxzjtwww", "2-3 w: nwkwtkw", "3-8 d: jddhdddlqd", "10-12 m: mmmmrmmmmvmmfmm", "2-7 l: llllllkllln", "9-15 x: xxxxxxxxpmxxpxxxwx", "4-8 n: nqnqnnnzn", "7-12 d: zddpjdddgddgxddwdddw", "7-8 b: bbwbbbrl", "6-13 p: zppkppprpvnbzpp", "2-8 w: cmnrmkzwpxrxwhfsd", "5-12 x: xvrxpbhlgfxx", "11-14 j: jjjjjjnjjjjjjc", "7-10 r: rdsrhrtrrrlrfncrb", "15-16 x: xxxxxxxxxxxxxxcx", "7-9 h: fhhhhrhhhh", "4-18 v: vvqjvvvvkvvqvkvvvvvv", "1-7 x: xxcfjxkxtxx", "10-12 c: ccccmccwclcjc", "5-6 l: llllkl", "1-5 h: hhhhn", "1-5 p: bppppp", "17-18 j: jjjjjjjjjjjjjjjjjj", "9-16 k: fkkkkkkkkkpkkkkhkkkn", "13-14 t: ttttttdttttttsttvt", "7-16 m: mmmmmmlmmmmgmmcmm", "14-15 d: ddddrdddvddddhdd", "2-4 x: xbxxtqxd", "5-16 f: fffffffffffffbfff", "12-16 w: wwwwjwwwwwwwmwwn", "5-7 c: cclccfvzccccmb", "7-16 m: mmmmmjmmmmcmnswj", "4-10 x: qpxrcxpxxsxx", "15-20 d: dddjdddddddddddddddx", "2-3 x: cxmpxs", "2-5 t: tlhztr", "9-12 x: xcdxhqhxpxgx", "1-11 f: zxnfsfjftfffjfzswdf", "1-3 j: pjmk", "15-16 h: kpcschhvfzphpnhvhhb", "16-19 s: ssssssssssssssssssf", "5-7 p: kppdcppp", "4-8 f: fffjfrfzfffmffjf", "2-5 q: zqqkvkxvzm", "11-12 w: wwwwwwwwwwww", "9-10 f: rffffffffzf", "12-13 p: pppppcpdppfrp", "7-9 n: nntnnnsnnnnnnn", "9-12 k: kkjkkkkkkkkkk", "3-6 m: mmmmfmm", "3-4 v: vqvw", "9-12 b: bbvbbbbphbbn", "4-6 b: mbbbplbvgbdgb", "6-8 h: hhfscsmznfccc", "1-8 h: khtshhkhwfc", "1-7 x: vxxxxxx", "5-8 l: llllrlllll", "9-10 l: llllllllll", "5-9 j: jqscttkjjsjjjnd", "7-14 p: pnlprpppjndpphppppp", "8-11 j: jxmjjjjjjjsjfmsq", "8-12 h: hhhhxgmhhwpfh", "4-13 h: hhhnqzhfmshhhhshhh", "3-4 q: qwtq", "7-8 c: fcczpcgqnccsc", "3-4 w: gwcwrl", "6-10 f: ffkfffffnffqcf", "7-8 f: fwvfmvffwfff", "5-9 l: llllxllln", "10-11 r: bjrdxrrbrrbrprrrcrd", "4-5 g: gggggtgw", "8-9 r: rghdrfrrg", "9-10 v: vvvvvvvvvv", "4-5 d: ddddlrzhdgw", "2-4 x: zxlx", "5-6 j: xjjjwj", "4-9 x: xlkxnmjnxtzmxxdqdxk", "13-15 f: ffwzfffpspfgxffffffp", "4-6 v: vvjxmrvrf", "4-16 b: ghzbqjqbhtjbbmkvkrb", "7-12 q: qqqqqqkqqqqqqqq", "4-15 z: zcmzzzlzzrlkzzzg", "13-14 x: xxxxxxxxxxvxxq", "2-5 h: hhgfhjxbpwmthtjsjhhl", "5-6 x: xxxltx", "4-16 v: vvvvvvvvvvmvvvtnvv", "9-10 s: gsvhnlspts", "2-4 k: kkkr", "4-6 j: jjnjjjtwnmjv", "4-6 n: nnnsnn", "3-4 d: fdjf", "6-8 r: rrrrqvdrrrsrr", "6-10 w: wnqvwqwqwwb", "9-10 k: kkskckkkkk", "4-18 d: dgdjjdddsddwdbhddm", "8-9 b: bbxbbdbkbbdb", "15-16 l: rvphlrrpmwfqkmcl", "3-4 m: mbmtxznmg", "4-6 c: cclccxcccccc", "8-9 p: ppppxbpqpppjp", "10-11 c: ccccccccccc", "4-13 c: cdnccclcszcwfcj", "5-8 l: ldllkllj", "2-10 k: dkbgkwgkzwwtkkc", "3-4 p: qrpcpdsp", "5-8 m: mmmmcmms", "2-5 c: czcpcc", "4-9 k: bkkkdkkkgk", "14-15 l: lllhllvllxbmgbl", "14-16 j: jjkzjhjjjjjjfjjwjpjw", "13-15 w: wwwwwwwwwvwwwwswwwww", "6-7 q: qqqqztv", "9-16 m: mmmfmmmmmmmmmmmmmmmm", "3-4 m: hmvnmjz", "12-13 g: gqggggggggglgggg", "3-7 h: hhqhhgkhshh", "7-9 h: jvptznhrrbhffcdp", "4-6 t: tttttttttt", "2-8 f: rfhbmftfxnxllkpqh", "6-14 z: zwzzzrzzzzzbzzzzgzz", "5-8 t: jkmddtqcqttrtzk", "2-5 p: ppprqsgpzng", "4-5 v: vvvlvfrjxh", "14-15 c: ccccccccdcccccvc", "5-6 j: jjjjjs", "1-2 g: ggdnzh", "8-15 p: ppfpgpxdvphdcpppp", "2-8 h: hmhhhhhthhhhh", "3-4 h: hhmn", "7-9 b: bbfdbjbqb", "3-6 d: ldfpftkxwqddbcdqd", "2-7 j: wstjkjjdjtpwwwxbg", "5-8 p: vmdppswpppzpqxrdt", "4-8 p: ppsgprrcpskp", "10-11 r: rbrzcfrrvmrtrrrrrcr", "5-9 j: jjmjjjjjx", "10-16 s: sssssssssssssssls", "4-7 p: ntpfphp", "1-2 l: glll", "9-11 x: xtxxxxxxrxxx", "7-8 d: ddnddxrrd", "1-3 x: jxdxfsxxtzvxxwxx", "8-9 s: ssssssncsl", "5-10 s: tsmspsxszsfftcs", "2-5 b: bbqbqb", "3-5 w: dnxljjsclwg", "11-12 n: cmlhcbxxnnmhn", "11-14 g: ggtgggdkhggggbggrg", "2-3 m: jvvm", "1-12 g: gggggggggggxggzggf", "12-13 p: mpppjpplppvpqpcpvp", "5-16 w: swtwhmxzwbwxwwwwwww", "5-6 m: mmmmzmm", "8-9 v: vvvvvvvvg", "3-4 w: lhprqpcwf", "9-14 j: jjjjjjjjjjjjjfj", "2-7 s: dssgssswp", "10-11 b: ldfwbqqhgbbpbbrcs", "11-12 f: bffvnfgfffqfqdgffzh", "2-8 p: hfcppzgp", "3-10 r: hfrcwtsrcmkrn", "4-5 j: jjxsjjj", "2-4 g: gggjg", "4-5 z: zzzcv", "2-6 w: wwncqxp", "5-6 m: lmmrjmmmmqm", "1-19 d: lddzdtdkdvddddddddd", "16-17 q: qzqtqqqqqqqqqqqpqqjs", "6-7 c: cfccxxc", "3-5 c: qgnccb", "6-11 s: cqqssmxwznspv", "11-19 s: sssssfssswgdsshssszs", "15-17 x: xxxkxxxxxxxpxwxxhx", "2-9 b: zbggdxbwbpv", "4-10 z: zzrjzzdpxzz", "12-13 m: mmmmmmmmmmmlm", "4-8 s: ssswssss", "9-10 b: xdbhbbpbbhkbbblvb", "11-12 t: ttttttttttlj", "5-6 l: llsfjll", "14-16 x: xxxxxxxxxzxzxxxzxx", "2-10 h: hsdtlhhpwhhh", "3-5 s: shgbh", "4-5 j: jjjjps", "13-14 d: ddddddkskddddddlmwdd", "5-10 w: hbwrwqwzwlgz", "3-6 b: bmbbxjbw", "11-12 f: fffffhfffffr", "10-17 l: llllllcllllllllll", "3-7 z: zbmzzzxzd", "4-5 l: dlbld", "2-5 r: mghzsbjrsqflrd", "6-8 q: qqqlqqqtql", "8-9 s: sssspsstss", "5-6 w: wwwwwm", "2-4 m: mxmm", "1-3 s: prrzbwfslzpdks", "10-13 v: vgvvzvvvvvnvvq", "10-11 w: wjwrwwwwwww", "14-15 b: bbbbbbbbbbbbbtk", "2-7 n: nnnncnn", "5-10 w: wwzwrwwwwwwww", "8-14 f: fffffwfznrvflf", "3-4 l: rllr", "2-4 x: phxkxxxx", "2-13 w: vwtlwgwmwwwjd", "3-8 v: xdszpbvvmvxbhcvlb", "1-6 x: xtkkpzdwtxx", "7-10 x: xxxxxxxxxkgxxxxxx", "5-6 q: qqvqqd", "18-19 m: mmmmmmmmmmmdmmmmmmz", "2-5 s: bbsts", "9-12 l: vlllllllcllll", "1-7 x: xxnvvxxpx", "2-3 f: dfbf", "4-6 v: vcbvrm", "1-3 k: ddkk", "1-6 q: qklqqqvs", "7-8 f: ffffwfhfmff", "3-6 b: wbbcsqhnpb", "5-6 x: xxxxxs", "3-10 g: gnsgrhrgsgwrlgcwgh", "4-5 t: tttht", "4-5 l: lllqllllllllllllll", "14-15 z: zzszzzzztzszzzzczzz", "5-7 j: cqvjxzjslrdjnjjq", "11-12 d: dpgddddzdddrdddq", "14-16 w: wwtwwzwwwwwwwkww", "9-13 p: pfppppfrqpppc", "3-4 x: gpklxz", "3-6 p: pxppznbpnp", "4-16 c: bdvcfddsvccqvcwcmgc", "1-2 s: dsgbs", "8-10 w: wwwwwwwwwf", "10-18 b: bbcbbbbbbfbbbbkbbb", "3-7 w: kzwcwtwjhb", "16-17 d: dddddddddddddddmh", "2-4 t: ttttx", "2-9 f: fwnfgfffftbf", "12-14 t: rttttztwtttwtttttc", "6-8 d: bfdjhhdmmffbdd", "16-18 f: lcnvfgvfggvtttnxjf", "2-8 l: llnsqgqcqwjs", "4-5 f: ffmdwsrfp", "3-4 q: fbkqkrlsqvlqmxqvv", "14-16 w: wwwwwwwwwwjwwdwhww", "1-4 t: tttnt", "3-5 s: vmbwsvqdssgrrzbj", "12-13 q: qqqqvqqqqqqqjqqh", "5-17 n: nnvnnnnnnvnnnnnmg", "2-4 l: fllll", "3-5 t: tqtvt", "6-8 r: rrrrrxrs", "1-4 z: zzzz", "1-2 k: gkbd", "1-5 r: rrrrg", "2-11 l: kwwjlllgwhlnlsqtrq", "13-15 h: hhhhhhhhhhhhghh", "1-3 h: hwhhwhxhh", "5-10 c: cmrgcfccccccj", "17-19 c: cnccccccpcccccccmcz", "1-8 v: hvdvgbmvxnvsvgkvvv", "10-11 k: kkkkkkkkkkj", "3-6 d: rjdjdggfdcxpldr", "3-14 g: ggjgblgggggglggggg", "18-20 z: dwzwsrqnxmzhswfgjzsz", "1-10 s: qshsqssmtsssbgsg", "7-17 l: hmllllqfkllllpllnlbw", "6-7 w: wgcwwnwwwx", "1-15 k: kvskkbkkkhkkktkkkk", "6-7 q: qnqmhnq", "2-6 n: nnnkxwjhfmtnfnnmg", "4-7 r: rwrfrrr", "13-14 n: nnfnnnnnnnnnpnnn", "3-5 h: hqktph", "8-12 f: fmffhjmfkxfrvcfrbr", "12-13 j: jjjjjjjjjjjljj", "2-9 l: glcwqflmllstjhpsp", "4-6 r: vrwrrxrm", "5-6 n: nnnnnsn", "14-18 l: lhllclllzsllvvllzlll", "12-13 f: fvzfffnfpxffm", "7-8 c: ccrcccfpwcg", "1-2 g: tggg", "9-13 x: bdxxxnhxmxxxxxxnd", "14-15 z: zpzgzzzvzdqzzzt", "13-14 b: bbrbbbbbbbcbmbbbkc", "1-2 f: fjndbffq", "8-11 h: zhwhlrhhhhlnkhhh", "3-8 v: vqvwvclvcplmvctjv", "6-7 g: ggxgglggngdg", "4-6 h: vslffhhwcbnhh", "6-9 c: rztcpdvcpc", "7-9 t: qtttttktttlk", "17-19 d: ddgdddxdddtmzddgdtwf", "16-18 q: qqlqqqqbqqqqqqqqqqq", "3-7 q: lwxcqqtjqqbs", "1-10 w: txwcwxqxzw", "1-2 v: qvvvvvvvv", "6-11 c: ccccchcccccctccc", "6-11 d: dddnddklzdddd", "3-12 p: pkqrppgcmptp", "13-15 r: rrrrrrrrrrrrrrt", "3-4 k: kkkmjkg", "6-11 l: xlllllsllmqncvc", "6-17 g: vgggngrgggqggggggg", "3-4 b: bbqb", "3-9 q: qfqdqlpxgtbqqjmjccqt", "4-6 f: cbfmfc", "2-11 d: gddtddtdddkpdfcdwm", "2-11 q: qmpdmfhkqlql", "8-9 v: vvvvgvvhv", "2-3 h: hxhhhp", "9-10 n: nnnnnnnnhthn", "16-17 q: qqqqhqqqqqqqqqqsk", "6-12 v: vvwvjbjdvxvzvvv", "10-12 v: vxvvvvvvvvvcj", "3-4 h: znhfvctppgjtqhhhl", "14-19 g: ggggggggggggggggggcg", "7-17 p: rpnfbxppcppprbppkds", "4-11 c: ccccczcccclc", "2-3 d: dvdl", "18-20 t: twtthtdgtdsvxttcfltg", "11-12 q: qqqqqcqhqmqgqqqs", "10-11 c: ccccvccccgc", "7-8 x: xxxxxxhxxxxxxx", "8-10 r: rcnrrrwfcz", "1-3 b: pjbk", "6-7 q: xqqqcbqjlq", "11-12 z: ndzzzzdzzzrzz", "2-9 g: gsgbmggnggggkfbcgggg", "11-13 k: qbfnkxbkkkhkkkkkkpkk", "4-7 d: dddvddkd", "4-10 c: jccdcpfchcszccccxfc", "8-9 z: xvzvnzzzfdzlzr", "2-5 n: zqnqnpnhwnnv", "11-12 g: ggkgggggkgxgg", "3-4 v: vvvnvtgvpr", "2-4 t: gtmtxkbqvj", "4-5 m: mmmmtmmm", "10-13 g: ggggfgsgpcgggvggg", "4-5 j: jjjjj", "12-15 v: vgvvzvvvvvvnjzvv", "16-18 r: rrrrrrrrrrrrrrrrrrr", "11-13 r: rrrrrrrrrgfrr", "12-13 s: tsssssssbssdss", "12-14 m: xmmmmmmmxmlpmmmmm", "6-13 w: wkwmlwwhcgwmgwjwgwww", "9-13 b: bbbbbbbbbbbkbbbg", "4-5 v: vttvlvs", "7-10 b: mbfbbbrffbzbbxlx", "4-6 t: ttcfxtns", "8-12 r: dcrzvdpprbmr", "2-5 j: cjrxjjfz", "9-12 b: bbbtwbnkpbrrkbbbqlb", "3-4 k: kkdhk", "4-5 v: vjlvkjxvv", "3-4 x: xxxrs", "5-7 h: hhrdhhhhh", "5-6 v: vfvvhfhc", "3-8 w: wwjwwwwwww", "9-11 g: gggngtgggghg", "1-4 q: hcqq", "11-18 w: wwwwjwwwrwblwwwwwwz", "2-10 h: chrvlwffjl", "13-14 w: wwwwwmwfwwkwwhww", "5-7 z: zzbzdzqz", "4-13 v: dvxclvvxcnmcxvsp", "7-11 c: fccwdcccsfbcc", "12-16 f: pfsfsgpcfffffffvffpf", "1-4 n: gnnnn", "6-8 j: jjjjjjhbd", "3-4 k: ktkp", "6-8 m: rmmgmjsmmm", "7-8 j: jjjjjcjjj", "15-18 r: rrrrrrrrrrrrrkgrrr", "1-2 z: zzmwrlmtwsxdbzss", "2-6 j: bpwbjqr", "3-14 q: njswqhttbqfqqzqhtq", "12-17 d: ddddddddzfdvqddmt", "2-15 j: jfxjjjzjjtbcxtj", "7-10 w: dpzwqflvdx", "2-8 b: bjbbczbbwbbbgmdvllb", "7-11 b: bbbbbbmbbbb", "7-8 f: smbzfnxgvm", "6-10 n: nnmnncndtnnn", "13-15 c: scnqcccccccqpgccqccc", "3-4 w: wwwv", "3-7 h: hhhrxbx", "8-12 n: nnnnpndnncts", "1-4 g: kgggfggg", "4-10 m: fbttqmzmmmxtmtm", "2-4 d: dmclzdvdd", "10-14 s: sfgtsjfsssssstbs", "1-3 p: ptpzpqlhprvxhrgvvgv", "4-7 n: nnnvnnnn", "5-6 c: plnccqrxtxcwzkccm", "5-10 j: jjjjjjjjjr", "7-9 b: bblbbfhbb", "7-10 t: wtttthtttthvt", "2-7 m: mrmfmjgcpmmmbwx", "9-16 k: kzklkwkkkhnrkkkkk", "9-13 l: qlllljlllllllllkk", "2-3 c: ctcc", "5-7 b: bbbbbbxb", "3-6 w: wtqrwwgkv", "5-7 x: xxxwxxp", "2-3 z: zzxcdn", "13-17 c: ccccccrfcccccnccx", "3-7 w: whfdzvwpg", "15-19 t: ttttttttttttnthtttct", "10-11 k: kkkkkkkkvxkkk", "4-9 g: gggggggglg", "3-5 j: ljnjj", "4-8 l: nttlhlldhsslcqzqpgdv", "7-8 r: tpxhclrrsdnmwcrgf", "8-11 w: lwwwwwwwwjw", "8-9 w: wppkzcrdmkwgqw", "3-8 z: vhzgnkzgkcqrmmvvkx", "7-11 n: nnnnnnnnnnmnn", "1-15 b: bbbftxndbbfbbpb", "6-7 d: wkdddldldcddddd", "3-5 b: bcbfvbd", "9-10 k: kkkkkqkkrk", "8-18 z: vszwbmgzjzgjmhpgcv", "4-9 z: zzzzznczxz", "3-4 d: dhdm", "1-9 q: zqqqqqgcqqq", "2-3 g: zvgnx", "2-4 j: jqjjh", "6-11 j: hcqcnjqjjgj", "5-6 j: jjjjjj", "6-7 d: dwdddkd", "1-5 l: pmplllll", "1-11 t: tttdlttsrpkqtt", "3-9 x: xxnxtxxxx", "7-8 f: fffffffg", "4-6 b: bhbbbrhbb", "6-11 f: xfncmzffrfsf", "10-11 h: pghprtcjjjhshkw", "8-10 n: nnknnnnznnnn", "3-5 q: jqqqk", "5-9 j: rrhfgjfjjjjjbdjnj", "6-8 t: tctjmtttqttt", "9-10 m: wmvmhmmmxddzmmmm", "2-11 c: flcqrnrqmcccs", "2-3 f: qfdx", "11-15 k: kkkkdkkkkkgkkkkkkrq", "9-14 h: hzhhfhhxhhhhhltnh"];
  // const startInput = ["1-1 q: abcdefg"]

  const validPwd1: string[] = startInput.filter((v) => {
    const parts = v.split(" ");
    const borders = parts[0] ? parts[0].split("-") : [];
    const minBorder = borders[0] ? Number(borders[0]) : undefined;
    const maxBorder = borders[1] ? Number(borders[1]) : undefined;
    const letter = parts[1] ? parts[1].slice(0, 1) : undefined;
    const pwd = parts[2] ? parts[2] : undefined;

    if (minBorder !== undefined && maxBorder !== undefined && letter !== undefined && pwd !== undefined) {
      const allPwdLetters = pwd.split("");
      let count = allPwdLetters.reduce((count, b) => count + (b === letter ? 1 : 0), 0);
      return minBorder <= count && count <= maxBorder;
    }

    console.error("This case is not considered: ", v)
    return false;
  })

  const stepTwo = window.performance.now();

  const validPwd2: string[] = startInput.filter((v) => {
    const parts = v.split(" ");
    const borders = parts[0] ? parts[0].split("-") : [];
    const position1 = borders[0] ? Number(borders[0]) : undefined;
    const position2 = borders[1] ? Number(borders[1]) : undefined;
    const letter = parts[1] ? parts[1].slice(0, 1) : undefined;
    const pwd = parts[2] ? parts[2] : undefined;

    if (position1 !== undefined && position2 !== undefined && letter !== undefined && pwd !== undefined) {
      const allPwdLetters = pwd.split("");
      if (allPwdLetters[position1 - 1] !== undefined && allPwdLetters[position2 - 1] !== undefined) {
        const pos1IsSameLetter = allPwdLetters[position1 - 1] === letter;
        const pos2IsSameLetter = allPwdLetters[position2 - 1] === letter;
        return (pos1IsSameLetter || pos2IsSameLetter) && !(pos1IsSameLetter && pos2IsSameLetter);
      }
      console.error("Something is undefined: ", allPwdLetters[position1 - 1], allPwdLetters[position2 - 1])
      return false
    }

    console.error("This case is not considered: ", v)
    return false;
  })


  const stepThree = window.performance.now();


  const mappedInput = startInput.map((v) => {
    const parts = v.split(" ");
    const borders = parts[0] ? parts[0].split("-") : [];
    return {
      minBorder: borders[0] ? Number(borders[0]) : undefined,
      maxBorder: borders[1] ? Number(borders[1]) : undefined,
      letter: parts[1] ? parts[1].slice(0, 1) : undefined,
      pwd: parts[2] ? parts[2] : undefined
    }
  })
  const validPwd12 = mappedInput.filter((v) => {
    if (v.minBorder !== undefined && v.maxBorder !== undefined && v.letter !== undefined && v.pwd !== undefined) {
      const allPwdLetters = v.pwd.split("");
      let count = allPwdLetters.reduce((count, b) => count + (b === v.letter ? 1 : 0), 0);
      return v.minBorder <= count && count <= v.maxBorder;
    }

    console.error("This case is not considered: ", v)
    return false;
  })
  const stepFour = window.performance.now();

  const validPwd22 = mappedInput.filter((v) => {
    if (v.minBorder !== undefined && v.maxBorder !== undefined && v.letter !== undefined && v.pwd !== undefined) {
      const allPwdLetters = v.pwd.split("");
      if (allPwdLetters[v.minBorder - 1] !== undefined && allPwdLetters[v.maxBorder - 1] !== undefined) {
        const pos1IsSameLetter = allPwdLetters[v.minBorder - 1] === v.letter;
        const pos2IsSameLetter = allPwdLetters[v.maxBorder - 1] === v.letter;
        return (pos1IsSameLetter || pos2IsSameLetter) && !(pos1IsSameLetter && pos2IsSameLetter);
      }
      console.error("Something is undefined: ", allPwdLetters[v.minBorder - 1], allPwdLetters[v.maxBorder - 1])
      return false
    }

    console.error("This case is not considered: ", v)
    return false;
  })

  const stepFifth = window.performance.now();
  console.log(validPwd12,validPwd22);

  return (
    <div className={props.className}>
      {/*First step*/}
      <p>Unser Algorithmus beginnt wieder mit einer Schleife durch das gesamte Array, mit der Länge {startInput.length}.
        In jedem unserer Durchgänge werden wir den String in seine Einzelteile zerlegen um das am Ende stehende Passwort
        zu bewerten.</p>
      <p>
        Im ersten Türchen haben wir uns ja auch darum gekümmert, dass die Anzahl der Schleifen-Durchgänge durch erste
        Filterungen verringert werden können. Das wäre in diesem Beispiel auch wieder möglich. Allerdings hab ich mich
        entschieden, den Rechner einfach mal rechnen zu lassen. (Mir ist aber auch keine clevere Vorfilterung
        eingefallen, die nicht selbst mehr Last verursacht als sie verringert)
      </p>
      <p>
        Bei jedem Schleifendurchgang schauen wir uns also den String an und werten ihn aus. Da haben wir zuerst die
        vorderen Grenzen, danach den gesuchten Buchstaben und als letztes das Passwort.
        Diese drei Bestandteile lassen sich durch ein Split auf das Leerzeichen voneinander lösen. Als nächstes splitten
        wir das ganze Password in ein eigenes Array. Dieses gehen wir wieder durch und zählen den gesuchten Buchstaben
        darin. Als letztes bewerten wir die Anzahl mit den beiden angegebenen Grenzen.
        Haben wir diese Vorgehensweise bei jedem Passwort durchgezogen sind wir fertig.
      </p>
      <p>Das Ergebnis unserer Untersuchung ist: <b><u>{validPwd1.length}</u></b></p>
      <hr/>
      {/*Second step*/}
      <p>Im zweiten Step wurde uns mitgeteilt, dass unser bisherige Passwort-Analyse leider fehlerhaft war.
        Also brauchen wir einen neuen Algorithmus. Dieser beginnt wieder, wie könnte es anders sein, mit einer Schleife
        durch das gesamte Array, mit der Länge {startInput.length}.
        In jedem unserer Durchgänge werden wir den String in seine Einzelteile zerlegen um das am Ende stehende Passwort
        zu bewerten.</p>
      <p>Das Ergebnis unserer Untersuchung ist: <b><u>{validPwd2.length}</u></b></p>
      <hr/>
      {/*Summary step*/}
      <p><b>Endergebnis: </b></p>
      <p> Eine Beurteilung gelingt uns wieder durch die Zeit. Unterteilt in die beiden Bereiche sind folgende
        Zeitabstände entstanden (Bitte bedenke, dass diese Zeiten live berechnet werden, d.h. sie sind schneller umso
        stärker dein Endgerät ist):</p>
      <ul>
        <li>{((stepTwo - stepOne)).toFixed(2)} ms (mein Endgerät lag bei 2.12)</li>
        <li>{((stepThree - stepTwo)).toFixed(2)} ms (mein Endgerät lag bei 1.48)</li>
        <li><b>{((stepThree - stepOne)).toFixed(2)} ms (mein Endgerät lag bei 3.60)</b></li>
      </ul>
      <hr className={"half"}/>
      <p className={"half"}>Durch eine kleine Optimierung, bei der am Anfang einmal die Bestandteile aus den Strings
        ausgelesen werden und in einzelne Objekte gepackt werden, konnte die Zeit
        um {((1 - (stepFifth - stepThree) / (stepThree - stepOne)) * 100).toFixed(0)}% verringert werden.</p>
      <ul className={"half"}>
        <li>{((stepFour - stepThree)).toFixed(2)} ms (mein Endgerät lag bei 2.41)</li>
        <li>{((stepFifth - stepFour)).toFixed(2)} ms (mein Endgerät lag bei 0.34)</li>
        <li><b>{((stepFifth - stepThree)).toFixed(2)} ms (mein Endgerät lag bei 2.75)</b></li>
      </ul>
      <p> Ich bin gespannt schaffst Du weniger? Probiere es doch aus vielleicht findest du ja einen besseren Algorithmus
        ;)</p>
      <hr/>
      <hr/>
    </div>
  );
}

export default styled(Door2)`
  .half {
    width: 50%;
    display: block;
    margin-left: auto !important;
    margin-right: auto !important;
  }
`;